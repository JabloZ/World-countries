from django.shortcuts import render

# Create your views here.
def home(request):
    return render(request, 'base.html', locals())
def map_view(request):
    return render(request, "map.html", locals())