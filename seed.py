from unicodedata import name
import requests

def get_pokemon():
        # """Call Pokemon api: """
    res = requests.get("https://pokeapi.co/api/v2/pokemon")
    data = res.json()
    results = data['results']

    metapod = results[10]['name']
    
    for dict in results:
        for val in dict:
            print (dict[val])

    # for names in results['name']:
    #     print(names)

# the variable "results" is a list so must use indeces to access items
    # for x in names:
    #     print(x)
    # return x


    