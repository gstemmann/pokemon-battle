from unicodedata import name
import requests
import pypokedex

def get_pokemon_names(): 
    res = requests.get("https://pokeapi.co/api/v2/pokemon")
    data = res.json()
    results = data['results']
    
    for dict in results:
            print (dict['name'])

def get_pokemon_ids():
    new_list = []
    i = 0
    while(i < len(new_list)): 
        res = requests.get(f"https://pokeapi.co/api/v2/pokemon{i}")
        data = res.json()
        results = data['results']
        print(results[i], end = '')

def get_pokemon_abilities():
    res = requests.get("https://pokeapi.co/api/v2/pokemon/clefairy")
    data = res.json()
    list_of_dicts = (data['abilities'])
    for x in list_of_dicts:
        for dict in x.values():
            print(dict)

def get_pokemon_type():
    res = requests.get("https://pokeapi.co/api/v2/pokemon/clefairy")
    data = res.json()
    list_of_dicts = (data['types'])
    print(list_of_dicts[0])


def get_pokemon():
    i=1
    pokemon = []
    while(i < len(pokemon)):
        abilities = pypokedex.get(abilities=f"{i}")
        print(abilities)








p = pypokedex.get(name='charmander')


# @app.route('/pokemon/show')
# def homepage():
#     """Show homepage: """

#     res = requests.get("https://pokeapi.co/api/v2/pokemon")
#     data = res.json()
#     results = data['results']
#     ivysaur = results[0]
# # the variable "results" is a list so must use indeces to access items
#     for x in results[0:150]:
#         print(x)

#     return render_template('/pokemon/show.html', ivysaur=ivysaur)