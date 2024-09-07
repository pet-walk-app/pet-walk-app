# Konfiguracja

## Wymagane oprogramowanie
* Java 21 (można pobrać zipa  i gdzieś rozpakować, np. https://jdk.java.net/java-se-ri/21)
* Docker https://docs.docker.com/desktop/install/windows-install/
* Git https://git-scm.com/downloads
* Intellij https://www.jetbrains.com/idea/download/?section=windows (wesja ultimate jest darmowa dla studentów po potwierdzeniu maila, ale jest też darmowa wersja community)

## Instalacja
1. W pierwszej kolejności potrzebujemy stworzyć token autoryzacyjny, aby mieć dostęp do repozytorium lokalnie.
   1. https://docs.github.com/en/authentication/connecting-to-github-with-ssh/generating-a-new-ssh-key-and-adding-it-to-the-ssh-agent#generating-a-new-ssh-key
   2. https://docs.github.com/en/authentication/connecting-to-github-with-ssh/adding-a-new-ssh-key-to-your-github-account
2. Sklonuj repo w wybranym przez siebie miejscu.\
``git clone git@github.com:Kotki-i-pieski/projekt-inzynierski.git``

## Konfiguracja IDE
1. Importujemy projekt do Intellij (cały projekt).
2. Otwieramy **File** &rarr; **Project Structure** i wybieramy folder z pobraną javę 21.
4. Importujemy folder backend jako moduł (**File** &rarr; **New** &rarr; **Module from existing sources**).\
Wybieramy opcję **Import module from external model** i wybieramy **maven**.
5. W ustawieniach zmieniamy line separator na **Unix and macOS**:\
![img_5.png](img_5.png)

## Uruchomienie aplikacji przez docker
1. Upewniamy się że docker desktop jest uruchomiony.
2. Uruchamiamy docker:\
``./start.sh`` - komenda uruchamia dockera (i buduje jeśli nie jest zbudowany).\
W razię potrzeby przebudowania dockera: `docker-compose up --build`
4. Serwer jest uruchmiony na porcie 8080 ([localhost:8080](http://localhost:8080)).\
Konfiguracja automatycznie supportuje hot-swap, zmiany w kodzie są aplikowane na serwerze automatycznie, bez potrzeby przeładowywania serwera.

## Debugowanie javy przy odpaleniu z dockera
1. Odpalamy apkę [przez dockera](#uruchomienie-aplikacji-przez-docker).
2. Dodajemy nową konfigurację "Remote JVM Debug" - domyślna konfiguracja oraz port.\
   ![img.png](img.png)
3. Uruchamiamy konfigurację.