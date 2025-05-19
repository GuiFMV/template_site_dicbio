from django.shortcuts import render
from .utils import carregar_headwords, buscar_dados_verbete

def home_view(request):
    return render(request, 'polls/home.html')

def consulta_view(request):
    letra = request.GET.get('letra')
    headwords = carregar_headwords()

    if letra:
        headwords = [h for h in headwords if h.upper().startswith(letra.upper())]

    return render(request, 'polls/consulta.html', {
        'headwords': headwords,
        'letra_selecionada': letra,
    })

def consulta_verbete_view(request, verbete):
    letra = request.GET.get('letra')  # ainda usamos para mostrar qual letra está ativa
    headwords = carregar_headwords()  # NÃO filtramos mais aqui

    dados = buscar_dados_verbete(verbete)

    return render(request, 'polls/consulta.html', {
        'headwords': headwords,
        'verbete_dados': dados,
        'verbete': verbete,
        'letra_selecionada': letra,
    })


def documentacao_view(request):
    return render(request, 'polls/documentacao.html')

def curiosidades_view(request):
    return render(request, 'polls/curiosidades.html')
