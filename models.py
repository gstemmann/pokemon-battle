from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

def connect_db(app):
    """Connect this database to provided Flask app.
    You should call this in your Flask app.
    """

    db.app = app
    db.init_app(app)


class User(db.Model):
    """Site user."""

    __tablename__ = "users"

    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    username = db.Column(db.Text, nullable=False)
    password = db.Column(db.Text, nullable=False)

    # pokemon_list = db.relationship("Pokemon_list", backref="user", cascade="all, delete-orphan")


class Pokemon(db.Model):

    __tablename__ = 'pokemon_info'

    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    name = db.Column(db.Text,  nullable=False)
    image = db.Column(db.Text, nullable=False)
    pokemon_type = db.Column(db.Text, nullable=False)   
    ability_id = db.Column(
        db.Integer,
        db.ForeignKey('abilities.id'), nullable=True)

    def __repr__(self):
        return f"<Pokemon {self.id} {self.name} {self.pokemon_type}>"

class Abilities(db.Model):

    __tablename__ = 'abilities'

    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    name = db.Column(db.Text, nullable=False)
    type = db.Column(db.Text, nullable=True)  