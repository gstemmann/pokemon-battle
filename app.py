from flask import Flask, render_template, request, flash, redirect
from flask_debugtoolbar import DebugToolbarExtension
from models import db, connect_db, User, PokemonInfo, Abilities
from forms import RegisterForm, LoginForm
import requests
app = Flask (__name__)



app.config['SQLALCHEMY_DATABASE_URI'] = "postgresql:///pokemon"
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['SQLALCHEMY_ECHO'] = True
app.config['DEBUG_TB_INTERCEPT_REDIRECTS'] = True
app.config['SECRET_KEY'] = ( "it's a secret")
toolbar = DebugToolbarExtension(app)

connect_db(app)



@app.route('/pokemon/show')
def homepage():
    """Show homepage: """

    res = requests.get("https://pokeapi.co/api/v2/pokemon")
    data = res.json()
    results = data['results']
    bulbasaur = results[0]
# the variable "results" is a list so must use indeces to access items
    for x in results[0:150]:
        print(x)

    return render_template('/pokemon/show.html', bulbasaur=bulbasaur)

@app.route('/')
def practice():

    res = requests.get("https://pokeapi.co/api/v2/pokemon")
    data = res.json()
    results = data['results']
    bulbasaur = results[0]
# the variable "results" is a list so must use indeces to access items
    for x in results[0:150]:
        print(x)
    render_template('practice.html')


@app.errorhandler(404)
def page_not_found(e):
    """Show 404 NOT FOUND page."""

    return render_template('404.html'), 404
