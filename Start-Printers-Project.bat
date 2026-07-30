@echo off
pushd "%~dp0"
npm run dev -- --host 127.0.0.1 --open
popd