import pandas as pd
import os
from functools import lru_cache

# Caminhos para os arquivos CSV
CSV_PATH_DIC = os.path.join(os.path.dirname(__file__), 'data/polls/csv_data/DicionarioParaSite.csv')
CSV_PATH_DEF = os.path.join(os.path.dirname(__file__), 'data/polls/csv_data/definitions.csv')


@lru_cache(maxsize=1)
def get_dicionario_df():
    """Carrega o dicionário com verbetes"""
    return pd.read_csv(CSV_PATH_DIC)


@lru_cache(maxsize=1)
def get_definitions_df():
    """Carrega as definições associadas aos verbetes"""
    return pd.read_csv(CSV_PATH_DEF)


def carregar_headwords():
    """Carrega todas as headwords"""
    df = get_dicionario_df()
    return df['Headword'].dropna().unique().tolist()


def buscar_dados_verbete(verbete):
    """Busca os dados do verbete (informações principais + definições)"""
    # Carrega os dados do dicionário
    dicionario_df = get_dicionario_df()
    dados_verbete = dicionario_df[dicionario_df['Headword'] == verbete]

    # Carrega as definições associadas ao verbete
    definitions_df = get_definitions_df()
    definicoes_verbete = definitions_df[definitions_df['Headword'] == verbete]

    if not dados_verbete.empty:
        # Convertendo os dados do verbete em um dicionário
        verbete_info = dados_verbete.iloc[0].to_dict()
        # Armazenando as definições associadas ao verbete
        verbete_info['Definicoes'] = definicoes_verbete[['SenseNumber', 'Definition']].to_dict(orient='records')
        return verbete_info

    return None
