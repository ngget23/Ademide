from __future__ import annotations

import argparse
import os
from http.server import SimpleHTTPRequestHandler, ThreadingHTTPServer
from pathlib import Path


def main() -> None:
    parser = argparse.ArgumentParser(description="Serve the portfolio locally.")
    parser.add_argument("--port", type=int, default=4321, help="Port to bind the local server.")
    parser.add_argument(
        "--host",
        default="127.0.0.1",
        help="Host interface to bind. Use 0.0.0.0 to expose on the local network.",
    )
    args = parser.parse_args()

    root = Path(__file__).resolve().parent
    os.chdir(root)

    server = ThreadingHTTPServer((args.host, args.port), SimpleHTTPRequestHandler)
    print(f"Serving {root} at http://{args.host}:{args.port}")
    try:
        server.serve_forever()
    except KeyboardInterrupt:
        print("\nStopping server.")
    finally:
        server.server_close()


if __name__ == "__main__":
    main()
