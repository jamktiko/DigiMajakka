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

_Projektin nimi ja lyhyt versio visiosta_

Tekijät:

Nimi 	Rooli(t) 	Yhteystiedot
* Siru Gull, 	Product Owner, Business, 	AA4317@student.jamk.fi
* Jenni Hapuli, Scrum Master, Päärooli:UI/UX, AA3215@student.jamk.fi
* Kalle Kaitamäki, Päärooli: Backend-developer, sivurooli: Testaus, AA3470@student.jamk.fi
* Joona Pöppönen,  Päärooli: Frontend-developer, AA3731@student.jamk.fi
* Tommi Tuikka, Päärooli: Frontend-developer, N5008@student.jamk.fi

### Termit ja lyhenteet

_Esimerkiksi:_

| Termi | Kuvaus |
|---|---|
GIT | Versionhallintajärjestelmä
GitHub | Palvelu joka on rakennettu GIT versionhallinnan ympärille
Markdown | Merkkauskieli
JS/JavaScript | Ohjelmointikieli
NodeJS | Javascript moottori
### Viitteet

_Esimerkiksi:_

| Viittaus | Materiaali |
|---|---|
HLTP | _https://github.com/jamktiko/tikotinder/blob/main/documents/hltp.md_


## Johdanto

Tämän dokumentin tarkoituksena on tuottaa esitutkimus tikotyökkäri palvelusta. Tikotyökkäri on työnvälitysalusta jolla tietojenkäsittelynopiskelijat ja työnantajat kohtaavat.


## Visio


Helppokäyttöinen ja saavutettava alusta, josta opiskelijat voivat etsiä itselleen työtehtäviä ja työkavereita.

Alusta yhdistää opiskelijat ja työnantajat jo opintojen aikana. Yksityishenkilöt ja yrittäjät voivat lisätä helposti ja nopeasti ilmoituksia pienistä töistä, joita opiskelijat voivat ottaa vastaan.

## Käyttäjäkertomukset

- [User journey maps](https://www.figma.com/file/MmvS1n5CDsOgFQ0H0htaYF/Palvelupolut%2Ftikoty%C3%B6kk%C3%A4ri?node-id=0%3A1)

## Tekniset vaatimukset

_Lista projektin teknisistä vaatimuksista_

Esimerkiksi:

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

Koko järjestelmä tullaan hostaamaan AWS:n palveluissa.

Backend sovellus pystytetään aws elastic beanstalk palvelun päälle. Backendin taustalla toimiva tietokanta pystytetään aws rds palvelun päälle.

Frontend sovellus pystytetään aws elastic beanstalk palvelun päälle.

![ratkaisu1](https://user-images.githubusercontent.com/79013696/190395206-3c8e9bee-d2bc-45c3-a481-d61da3ed00aa.png)


### Ratkaisuvaihtoehto 2

#### Toteutusympäristö
![ratkaisu2](https://user-images.githubusercontent.com/79013696/190395405-26be9f26-151a-4d30-9e41-308898f0d416.png)

### Ratkaisuvaihtoehto 3

#### Toteutusympäristö
![ratkaisu3](https://user-images.githubusercontent.com/79013696/190395455-2e177d99-aaf2-44fd-9a97-d52f26b1131f.png)

### Ratkaisuvaihtoehto 4

#### Toteutusympäristö
![ratkaisu4](https://user-images.githubusercontent.com/79013696/190395517-41a5a175-7f08-40c5-9d11-a3b66330a2cd.png)

### Ratkaisuvaihtoehto 5

#### Toteutusympäristö
![ratkaisu5](https://user-images.githubusercontent.com/79013696/190395555-e7972092-9069-4d03-99b2-fb97a141009e.png)

Frontend sovellus pystytetään aws elastic beanstalk palvelun päälle. Lähdekoodi tallennetaan s3 buckettiin.
_Tässä aliluvussa kerrotaan ympäristön jossa tietojärjestelmä tulee toimimaan. Tähän kannattaa liittää myös yksinkertainen arkkitehtuurikuva, josta pystytään havainnoimaan järjestelmän oleelliset osat ja osien välinen kommunikointi_

#### Toteutettavat kertomukset

_Tässä aliluvussa kerrotaan mitä kertomuksia kyseisellä tekniikalla pystytään toteuttamaan ja mitä ei_

#### Työmääräarviot

_Tähän arvioidaan hyvin karkealla tasolla työhön kuluva aika. Tehkää arviot käyttäen hyväksi seurantaraportin Työmäärien arviointi -välilehteä (SeurantaRaportti_Projektin_nimi.xls). Työmäärien arvioinnissa jokainen projektin jäsen tekee omat arvionsa ja sen jälkeen keskustellaan arviot läpi, jolloin päätetään vaiheeseen arvioitavat tunnit._

_Esimerkiksi_>
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

_Tässä aliluvussa kerrotaan ratkaisuvaihtoehdon hyvät ja huonot puolet objektiivisesti_

## Yhteenveto

_Tässä luvussa tehdään ehdotus järjestelmän toteutustavasta (siis jokin edellä esitellyistä vaihtoehdoista) ja perustellaan ko. valinta._
