import json
import faiss
import numpy as np
import os

from rag.embedder import create_embedding

BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))

dataset_path = os.path.join(BASE_DIR, '..', 'dataset', 'recipes.json')

with open(dataset_path, 'r') as f:

    recipes = json.load(f)

texts = [
    " ".join(recipe["ingredients"])
    for recipe in recipes
]

embeddings = np.array([
    create_embedding(text)
    for text in texts
]).astype('float32')

dimension = embeddings.shape[1]

index = faiss.IndexFlatL2(dimension)

index.add(embeddings)

def retrieve_recipe(query):

    query_embedding = np.array([
        create_embedding(query)
    ]).astype('float32')

    distances, indices = index.search(query_embedding, 1)

    return recipes[indices[0][0]]