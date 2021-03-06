import os
from flask import Flask, render_template, request, redirect
from flask_debugtoolbar import DebugToolbarExtension
from models import db, connect_db, User





# app.config['SQLALCHEMY_DATABASE_URI'] = (
#     os.environ.get('DATABASE_URL', 'postgresql:///pokemon'))
# app.config['SQLALCHEMY_DATABASE_URI'] = os.environ.get('DATABASE_URI').replace('postgres://', 'postgresql://')


app = Flask (__name__)

uri = os.environ.get("DATABASE_URL", "postgresql:///pokemon")
if uri.startswith("postgres://"):
    uri = uri.replace("postgres://", "postgresql://", 1)

app.config['SQLALCHEMY_DATABASE_URI'] = uri
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['SQLALCHEMY_ECHO'] = True
app.config['DEBUG_TB_INTERCEPT_REDIRECTS'] = True
app.config['SECRET_KEY'] = os.environ.get('SECRET_KEY', 'nevertell')
toolbar = DebugToolbarExtension(app)

connect_db(app)

@app.route('/')
def home():
    return render_template('base.html')

############################# USER ROUTES #####################################
@app.route('/users/signup', methods=["GET"])
def users_new_form():
    """Show a form to create a new user"""

    return render_template('users/signup.html')

@app.route('/users/signup', methods=["POST"])
def signup():
    """ make a new instance of a user and save it to db"""
    username = request.form['username']
    password = request.form['password']

    user = User(username=username, password=password)
    db.session.add(user)
    db.session.commit()
    
    return redirect (f"/{user.id}")

@app.route("/<int:user_id>")
def show_user(user_id):

    user = User.query.get_or_404(user_id)
    return render_template("/users/show.html", user=user)

@app.route('/users/<int:user_id>/edit')
def users_update():
    return redirect("/users/edit.html")

@app.route('/users/<int:user_id>/delete')
def users_destroy():
 
    return redirect("/users/delete.html")



###################### POKEMON ROUTES ############################


# @app.route('/pokemon/show')
# def show_pokemon():
#     pokemon = Pokemon.query.all()
#     print('*******************')
#     print(pokemon)
#     return render_template('pokemon/pokemon.html', pokemon=pokemon)

# @app.route('/pokemon/choose')
# def show_pokemon_list():
#     # pokemon_input = request.form['pokemon_input']
#     # print(pokemon_input)
#     pokemon = pypokedex.get(name='dragonite')
#     moves = [move.name for move in pokemon.moves['sun-moon']]
#     # types = pokemon.types

#     return render_template ('/pokemon/choose.html', pokemon=pokemon, moves=moves)


@app.route('/pokemon/stats', methods=['GET', 'POST'])
def start():

    return render_template('pokemon/stats.html')

@app.route('/pokemon/battle')
def show_pokemon_battle_screen():
  

    return render_template ('/pokemon/battle.html')


