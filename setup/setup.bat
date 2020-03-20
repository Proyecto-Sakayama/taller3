@echo off
cls

start cmd /k call base.bat %CD%\database.sql
start cmd /k call server.bat