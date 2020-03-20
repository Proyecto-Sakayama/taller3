@echo off

Rem Reemplazar la ruta siguiente con la ubicación  correspondiente a su instalación de MySQL.
CD "C:\Program Files (x86)\MySQL\MySQL Server 5.1\bin\"
mysql --host=localhost --user=root --password=root  < %1

echo Base de datos creada correctamente
pause