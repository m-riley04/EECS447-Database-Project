#!/usr/bin/env python3
import asyncio
import sys
import os

async def stream(name, cmd, cwd):
    # Start the process
    proc = await asyncio.create_subprocess_shell(
        cmd,
        cwd=cwd,
        stdout=asyncio.subprocess.PIPE,
        stderr=asyncio.subprocess.STDOUT,
    )

    # Read its output line by line
    assert proc.stdout
    while True:
        line = await proc.stdout.readline()
        if not line:
            break
        print(f"[{name}] {line.decode().rstrip()}")

    return await proc.wait()

async def main():
    ## Install & build
    print("🚧 Installing & building…")
    os.system("cd backend && npm install")
    os.system("cd frontend && npm install")

    ## Launch both
    print("Launching server and client…")
    srv = asyncio.create_task(stream("SERVER", "node src/server.js", "backend"))
    cli = asyncio.create_task(stream("CLIENT", "npm run dev", "frontend"))

    ## Wait until either one exits
    done, pending = await asyncio.wait(
        {srv, cli},
        return_when=asyncio.FIRST_COMPLETED
    )

    ## Cancel the other
    for task in pending:
        task.cancel()

    # 5) exit with the same code as the one that finished first
    first = done.pop()
    code = first.result()
    print(f"Process exited with code {code}, shutting down.")
    sys.exit(code)

if __name__ == "__main__":
    asyncio.run(main())
