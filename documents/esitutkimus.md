# Esitutkimus

- [Esitutkimus](#esitutkimus)
  - [Projektin tiedot](#projektin-tiedot)
    - [Termit ja lyhenteet](#termit-ja-lyhenteet)
    - [Viitteet](#viitteet)
  - [Johdanto](#johdanto)
  - [Visio](#visio)
  - [Käyttäjäkertomukset](#k%C3%A4ytt%C3%A4j%C3%A4kertomukset)
  - [Tekniset vaatimukset](#tekniset-vaatimukset)
  - [Ratkaisuvaihtoehdot](#ratkaisuvaihtoehdot)
    - [Ratkaisuvaihtoehto 1](#ratkaisuvaihtoehto-1)
      - [Toteutusympäristö](#toteutusymp%C3%A4rist%C3%B6)
      - [Toteutettavat kertomukset](#toteutettavat-kertomukset)
      - [Työmääräarviot](#ty%C3%B6m%C3%A4%C3%A4r%C3%A4arviot)
      - [Pros and Cons](#pros-and-cons)
  - [Yhteenveto](#yhteenveto)

## Projektin tiedot



Tekijät:

Nimi 	Rooli(t) 	Yhteystiedot
* Siru Gull, 	Product Owner, Business, 	AA4317@student.jamk.fi
* Jenni Hapuli, Scrum Master, Päärooli:UI/UX, AA3215@student.jamk.fi
* Kalle Kaitamäki, Päärooli: Backend-developer, sivurooli: Testaus, AA3470@student.jamk.fi
* Joona Pöppönen,  Päärooli: Frontend-developer, AA3731@student.jamk.fi
* Tommi Tuikka, Päärooli: Frontend-developer, N5008@student.jamk.fi

### Termit ja lyhenteet

| Termi | Kuvaus |
|---|---|
Git | Versionhallintajärjestelmä
GitHub | Palvelu joka on rakennettu GIT versionhallinnan ympärille
Markdown | Merkkauskieli
NodeJS | Javascript ajoympäristö
PWA | Progressiivinen web sovellus
UX | Käyttäjäkokemus
UI | Käyttöliittymä
AWS | Amazonin pilvipalvelut
MariaDB | Relaatiotietokanta
Express | Javascript sovelluskehys backend kehitykseen
Angular | Javascript sovelluskehys frontend kehitykseen
Cors | Javascript kirjasto
Cypress | Työkalu frontendin testaamiseen
Docker | Tarjoaa käyttöjärjestelmä pohjaisia kontteja sovellusten ajamiseen

### Viitteet
 
| Viittaus | Materiaali |
|---|---|
Projektisuunnitelma |_https://github.com/jamktiko/tikotinder/blob/main/documents/projektisuunnitelma.md_
HLTP | _https://github.com/jamktiko/tikotinder/blob/main/documents/hltp.md_


## Johdanto

Tämän dokumentin tarkoituksena on tuottaa esitutkimus tikotyökkäri palvelusta. Tikotyökkäri on työnvälitysalusta jolla tietojenkäsittelynopiskelijat ja työnantajat kohtaavat.


## Visio


Helppokäyttöinen ja saavutettava alusta, josta opiskelijat voivat etsiä itselleen työtehtäviä ja työkavereita.

Alusta yhdistää opiskelijat ja työnantajat jo opintojen aikana. Yksityishenkilöt ja yrittäjät voivat lisätä helposti ja nopeasti ilmoituksia pienistä töistä, joita opiskelijat voivat ottaa vastaan.

## Käyttäjäkertomukset

- [User journey maps](https://www.figma.com/file/MmvS1n5CDsOgFQ0H0htaYF/Palvelupolut%2Ftikoty%C3%B6kk%C3%A4ri?node-id=0%3A1)

## Tekniset vaatimukset



1. Sivuston tulee käyttää https yhteyttä tiedon siirtoon.
2. Sivuston pitää olla responsiivinen usealla eri selaimella ja laitteella.
3. Sivuston tulee täyttää gdpr:n asettamat vaatimukset
4. Sivuston tulee täyttää pwa standardin vaatimukset
5. Frontend-sovelluksen tulee pystyä yhdistämään backend-sovellukseen
6. Backend-sovelluksen pitää pystyä yhdistämään tietokantaan
7. Tietokannan tulee olla vähintään kolmannessa normaalimuodossa
8. Sivuston tulee olla mahdollisimman saavutettava


## Ratkaisuvaihtoehdot

_Listaa niin monta ratkaisuvaihtoehtoa kuin niitä tulee ilmi_

### Ratkaisuvaihtoehto 1

#### Toteutusympäristö

Koko järjestelmä hostataan AWS:n palveluissa.

Aws:n pystytetään EC2 instanssi joka samanaikaisesti ajaa NodeJS express rest API:a ja Angular frontendiä. Ec2 on käytännössä aws:n pilvessä toimiva virtuaalikone.
Lähdekoodi tallennetaan S3 buckettiin josta ec2 saa sen käyttöönsä. S3 on aws:n objektipohjainen palvelu tietojen tallentamiseen.

Tietokanta pystytetään aws:n rds (relational database service) palveluun. Ec2 instanssissa toimivalla rest api:lla hallitaan tätä tietokantaa.
Tietokantana toimii MariaDB.

Sovellus julkaistaan aws route 53 dns palvelun avulla. Palvelulla saadaan luotua sovellukselle oma domain.

Backend-sovellus toteutetaan nodejs ympäristössä käyttäen rest arkkitehtuuria. Sovelluksen rakentamiseen käytetään express frameworkkia.

Frontend sovellus toteutaan nodejs ympäristössä Angular frameworkilla.

![Näyttökuva 2022-9-16 kello 9 36 01](https://user-images.githubusercontent.com/79013696/190572509-c41b0476-fa54-4b01-afd1-8dcf4f425568.png)


### Ratkaisuvaihtoehto 2

#### Toteutusympäristö

Koko järjestelmä hostataan AWS:n palveluissa.

Frontend- ja backend sovelluksia ajetaan aws elastic beanstalk palvelussa. Elastic beanstalk on helppokäyttöinen palvelu joka hoitaa automaattisesti suuren osan julkaisuun ja ylläpitoon liityvistä toimista.
Lähdekoodi tallennetaan S3 buckettiin josta beanstalk saa sen käyttöönsä. S3 on aws:n objektipohjainen palvelu tietojen tallentamiseen.

Tietokanta pystytetään aws:n rds (relational database service) palveluun. Elastic beanstalkissa toimivalla rest api:lla hallitaan tätä tietokantaa.
Tietokantana toimii MariaDB.

Sovellus julkaistaan aws route 53 dns palvelun avulla. Palvelulla saadaan luotua sovellukselle oma domain.

Backend-sovellus toteutetaan nodejs ympäristössä käyttäen rest arkkitehtuuria. Sovelluksen rakentamiseen käytetään express frameworkkia.

Frontend sovellus toteutaan nodejs ympäristössä Angular frameworkilla.

![Näyttökuva 2022-9-16 kello 9 36 25](https://user-images.githubusercontent.com/79013696/190572574-ce1e4c99-532b-4a94-972f-a97ba6b7253e.png)



### Ratkaisuvaihtoehto 3

#### Toteutusympäristö

Backend-sovellus pystytetään heroku palveluun. Heroku on konttipohjainen alusta aplikaatioiden hostaukseen.

Frontend-sovellus pystytetään Firebase palveluun. Firebase on googlen palvelu web-aplikaatioiden hostaamiseen.

Tietokanta pystytetään MongoAtlas palveluun. MongoAtlas on palvelu mongoDB tietokannan hostaamiseen eri alustoilla.

Backend-sovellus toteutetaan nodejs ympäristössä käyttäen rest arkkitehtuuria. Sovelluksen rakentamiseen käytetään express frameworkkia.

Frontend sovellus toteutaan nodejs ympäristössä Angular frameworkilla.

![ratkaisu5](https://user-images.githubusercontent.com/79013696/190395555-e7972092-9069-4d03-99b2-fb97a141009e.png)


#### Toteutettavat kertomukset

Ratkaisuvaihtoehdot 1 ja 2 = niissä on mahdollista toteuttaa kaikki käyttäkertomukset. Ratkaisuvaihtoehto 3 on todettu huonoksi yhteisessä keskustelussa verrattuna muihin ratkaisuihin. AWS on meille tutumpi teknologia käyttää.

#### Työmääräarviot

| Vaihe | Tunnit | Muuta?
|---|---|---|
Käynnistys | 30 | Projektin kehitysympäristöjen pystytys
Opiskelu ja muu tutoriaali | 500 | Ongelmakohtien ratkaisuehdotusten etsimistä/opiskelua
UI/UX suunnittelu | 300 | Koko käyttöliittymä ja käyttäjäkokemus
Sisällöntuotanto |50| Kuvat, videot + muu asiaan kuuluva
Saavutettavuus |30| Ohjeet miten verkkopalvelusta tulee saavutettava
Frontti | 250 | Angularkoodi
Backend | 250 | NodeJS yms
Palaverit&suunnittelu | 150 | Scrum-prosessin palaverit + muut palaverit
Testaus | 50 | Yksikkötestaus, AB-testaus, blackbox, automaatiotestaus? 
Liiketoiminta | 200 | TikoBiz
Muu tekniikka | 150 | AWS, tietokannat yms.
Työhyvinvointi | 50 | Kahvittelut yms
Kirjalliset tuotokset/ohjevideot | 90 | Kevytyrittäjyyteen ohjeet,  UKK-materiaali, sivuston käyttöohjeet yms.

**Yht** | 1950 | laskettiin 5 henkilölle 13 viikkoa tunteja

#### Pros and Cons

Hyvät:

* Koko palvelu samassa infrastruktuurissa
* Hinta

Huonot:

* Ratkaisuvaihtoehto 1 ei ole korkean käytättevyyden palvelu -> vaatii enemmän työtä
* Ratkaisuvaihto 3 ei ole hyvä.

## Yhteenveto

Todennäköisesti päädymme käyttämään ratkaisuvaihtoehto 1:stä, koska se on halvempi. Konsultoimme vielä pilvipalveluexperttiä Mr. Tenoa
