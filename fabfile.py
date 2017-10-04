import os
from fabric.api import cd, env, run, sudo, get, put, local

# Common VARS
PROJECT_NAME = "react-shop"

# Remote VARS
REMOTE_HOME_DIR = "/var/www/"
REMOTE_PROJECT_DIR = os.path.join(REMOTE_HOME_DIR, PROJECT_NAME)
REMOTE_PROJECT_DIR_TEST =  REMOTE_HOME_DIR + "test/" + PROJECT_NAME

env.warn_only = True

def prod():
    env.user = 'root'
    env.hosts = ['shop.serga.name']

def update():
    with cd(REMOTE_PROJECT_DIR):
        local('git push')
        run('git reset --hard')
        run('git pull -f')
        run('git reset --hard')
        run('git checkout master')
        run('yarn')
        run('yarn run publish')

def test_update():
    with cd(REMOTE_PROJECT_DIR_TEST):
        local('git push --set-upstream origin test')
        run('git pull -f')
        run('git reset --hard')
        run('git checkout test')
        run('yarn')
        run('yarn run publish')
