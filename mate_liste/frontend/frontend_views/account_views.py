from django.http import HttpResponseRedirect
from django.shortcuts import render
from django.contrib.auth import authenticate, login
from django.contrib import messages
from ..forms import LoginForm

def login_view(request):
    """Function view responsible for handling login page and functionality"""
    if request.POST:
        next_page = request.POST.get('next')
        if next_page is None:
            next_page = "/"
        if request.user.is_authenticated:
            return HttpResponseRedirect(next_page)
        else:
            form = LoginForm(request.POST)
            if form.is_valid():
                data = form.cleaned_data
                user = authenticate(username=data['username'], password=data['password'])
                if user is not None:
                    if user.is_active:
                        login(request, user)
                        return HttpResponseRedirect(next_page)
                    else:
                        messages.error(request, "Account has been deactivated")
                        return render(request, 'login.html', {"next" :next, "form": form})
                else:
                    messages.error(request, "Username and/or Password incorrect")
                    return render(request, 'login.html', {"next" :next, "form": form})
            else:
                messages.error(request, "The Form is invalid")
                return render(request, 'login.html', {"next" :next, "form": form})
    else:
        form = LoginForm()
        return render(request, 'login.html', {"next" :request.GET.get('next'), "form":form})

def logout_view(request):
    """Functino view responsible for handling logout functionality"""
    logout(request)
    return HttpResponseRedirect("/")
    