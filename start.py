#!/usr/bin/env python3
import asyncio
import sys
import os
import signal
import subprocess

# Utility to choose the right flags
IS_WINDOWS = os.name == "nt"
NEW_GROUP_FLAG = subprocess.CREATE_NEW_PROCESS_GROUP if IS_WINDOWS else 0

async def stream_output(name, proc):
    assert proc.stdout
    while True:
        line = await proc.stdout.readline()
        if not line:
            break
        print(f"[{name}] {line.decode().rstrip()}")

async def handle_input(srv_proc, cli_proc):
    loop = asyncio.get_running_loop()
    while True:
        line = await loop.run_in_executor(None, sys.stdin.readline)
        if not line:
            continue
        cmd = line.strip()
        if cmd == "/exit" or cmd == "/quit":
            print("Exiting...")
            return
        # forward everything else into server stdin
        if srv_proc.stdin:
            srv_proc.stdin.write(line.encode())
            await srv_proc.stdin.drain()

def kill_tree(proc):
    """Kill the entire process group for proc."""
    try:
        if IS_WINDOWS:
            # /T = tree, /F = force
            subprocess.run(["taskkill", "/PID", str(proc.pid), "/T", "/F"],
                           stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL)
        else:
            # send SIGTERM to the group
            os.killpg(os.getpgid(proc.pid), signal.SIGTERM)
    except Exception:
        pass

async def main():
    # one‑time install/build
    print("Installing dependencies...")
    await asyncio.to_thread(os.system, "cd backend && npm install")
    await asyncio.to_thread(os.system, "cd frontend && npm install")

    srv = None
    cli = None
    try:
        # Launch server in its own process group
        srv = await asyncio.create_subprocess_exec(
            "node", "src/server.js",
            cwd="backend",
            stdin=asyncio.subprocess.PIPE,
            stdout=asyncio.subprocess.PIPE,
            stderr=asyncio.subprocess.STDOUT,
            creationflags=NEW_GROUP_FLAG,
            start_new_session=not IS_WINDOWS
        )

        # Launch client in its own group too
        cli = await asyncio.create_subprocess_shell(
            "npm run dev",
            cwd="frontend",
            stdin=subprocess.DEVNULL,        # keep client from stealing stdin
            stdout=asyncio.subprocess.PIPE,
            stderr=asyncio.subprocess.STDOUT,
            creationflags=NEW_GROUP_FLAG,
            start_new_session=not IS_WINDOWS
        )

        tasks = {
            asyncio.create_task(stream_output("SERVER", srv)),
            asyncio.create_task(stream_output("CLIENT", cli)),
            asyncio.create_task(handle_input(srv, cli)),
        }

        # wait until user types "/exit" or one of the procs dies
        done, pending = await asyncio.wait(tasks, return_when=asyncio.FIRST_COMPLETED)
        for task in pending:
            task.cancel()

    finally:
        # force‑kill entire trees
        if srv:
            kill_tree(srv)
            await srv.wait()
        if cli:
            kill_tree(cli)
            await cli.wait()

    return 0

if __name__ == "__main__":
    exit_code = asyncio.run(main())
    sys.exit(exit_code)
