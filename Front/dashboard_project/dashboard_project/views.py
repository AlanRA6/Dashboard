import subprocess
import paramiko
from django.shortcuts import render

def home(request):
    # Configurar la conexión SSH
    ssh = paramiko.SSHClient()
    ssh.set_missing_host_key_policy(paramiko.AutoAddPolicy())  # Asegura que se acepte la clave del host
    
    # Conectar al servidor remoto (reemplaza con los detalles correctos)
    ssh.connect('146.190.142.160', username='root', password='b130fd7070C.c130fd8070J')

    # Ejecutar el script remoto para operadores activos
    command_activos = "/usr/src/aris/operadores_llamada.sh"
    stdin, stdout, stderr = ssh.exec_command(command_activos)

    # Leer la salida
    output_activos = stdout.read().decode('utf-8')

    # Procesar el resultado
    if "Operadores en llamada" in output_activos:
        active_calls = output_activos.split(":")[1].strip()
    else:
        active_calls = 0  # Si no hay llamadas activas


    #Ejecutar el script para operadores disponibles o en linea
    command_linea = "/usr/src/aris/operadores_linea.sh"
    stdin, stdout, stderr = ssh.exec_command(command_linea)
    output_linea = stdout.read().decode('utf-8')
    
    #Procesar el resultado
    if "Operadores en linea" in output_linea:
        line_operators = output_linea.split(":")[1].strip()
    else:
        line_operators = 0 #Si no hay operadores en línea
    
    # Cerrar la conexión SSH
    ssh.close()

    # Pasar el número de llamadas activas al template HTML
    return render(request, 'index.html', {
        'active_calls': active_calls,
        'line_operators':line_operators
        })

def base(request):
    return render(request, "base.html")

