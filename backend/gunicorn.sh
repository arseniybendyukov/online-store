#!/bin/bash
NAME="backend-gunicorn" #name of the service to be run by supervisor
DJANGODIR=/root/PROFFCLEANMARKET/backend/project
DJANGOENVDIR=/root/PROFFCLEANMARKET/backend/venv
USER=root #you can see your user name by running command whoami
GROUP=root
NUM_WORKERS=2
TIMEOUT=500
DJANGO_SETTINGS_MODULE=project.settings
DJANGO_WSGI_MODULE=project.wsgi
PORT=8000
LOCAL_IP=127.0.0.1

echo "Starting $NAME as `whoami`"

cd $DJANGODIR
source /root/PROFFCLEANMARKET/backend/venv/bin/activate #run the virtual environment
export DJANGO_SETTINGS_MODULE=$DJANGO_SETTINGS_MODULE #set the global variable to the settings file
export PYTHONPATH=$DJANGODIR:$PYTHONPATH #set your django app directory as python path

exec ${DJANGOENVDIR}/bin/gunicorn ${DJANGO_WSGI_MODULE}:application \
  --name $NAME \
  --workers $NUM_WORKERS \
  --timeout $TIMEOUT \
  --user=$USER --group=$GROUP \
  --pythonpath=/root/PROFFCLEANMARKET/backend/venv/bin \
  --bind=$LOCAL_IP:$PORT \
  --log-level=debug \
  --log-file=-
