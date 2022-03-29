from unicodedata import name
import requests



def get_pokemon_names():
        # """Call Pokemon api: """
    res = requests.get(f"https://pokeapi.co/api/v2/pokemon/{i}/names")
    data = res.json()
    results = data['results']
    print(results)



    metapod = results[10]['name']
    
    for dict in results:
        for val in dict:
            print (dict['name'])


    # for result in results:
    #     pokemon = Pokemon(name=result['name'])
    #     db.session.add()


    # for dict in len(results):
    #     for val in dict:
    #         print(dict[val])

    # for names in results['name']:
    #     print(names)

# the variable "results" is a list so must use indeces to access items
    # for x in names:
    #     print(x)
    # return x


    