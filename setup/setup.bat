@echo off
cls

start cmd /k call database.bat %CD%\database.sql
start cmd /k call server.bat