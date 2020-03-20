@echo off
cls

Rem Reemplazar el valor de la variable tomcat_location con la ruta correspondiente a su instalación de Apache Tomcat.
set tomcat_location=C:\tomcat\apache-tomcat-8.5.50

set tomcat_webapp_location=%tomcat_location%\webapps\
set tomcat_bin_location=%tomcat_location%\bin\
copy taller3.war %tomcat_webapp_location%
cd %tomcat_bin_location%
startup

pause