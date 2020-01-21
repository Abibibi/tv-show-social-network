--
-- PostgreSQL database dump
--

-- Dumped from database version 9.5.19
-- Dumped by pg_dump version 9.5.19

SET statement_timeout = 0;
SET lock_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- Name: plpgsql; Type: EXTENSION; Schema: -; Owner: 
--

CREATE EXTENSION IF NOT EXISTS plpgsql WITH SCHEMA pg_catalog;


--
-- Name: EXTENSION plpgsql; Type: COMMENT; Schema: -; Owner: 
--

COMMENT ON EXTENSION plpgsql IS 'PL/pgSQL procedural language';


SET default_tablespace = '';

SET default_with_oids = false;

--
-- Name: actors; Type: TABLE; Schema: public; Owner: serialkiller
--

CREATE TABLE public.actors (
    id integer NOT NULL,
    name character varying(64) NOT NULL,
    created_at date NOT NULL,
    updated_at date
);


ALTER TABLE public.actors OWNER TO serialkiller;

--
-- Name: actors_id_seq; Type: SEQUENCE; Schema: public; Owner: serialkiller
--

CREATE SEQUENCE public.actors_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.actors_id_seq OWNER TO serialkiller;

--
-- Name: actors_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: serialkiller
--

ALTER SEQUENCE public.actors_id_seq OWNED BY public.actors.id;


--
-- Name: chatmessages; Type: TABLE; Schema: public; Owner: serialkiller
--

CREATE TABLE public.chatmessages (
    id integer NOT NULL,
    content text NOT NULL,
    users_id integer NOT NULL,
    "createdAt" date NOT NULL,
    "updatedAt" date
);


ALTER TABLE public.chatmessages OWNER TO serialkiller;

--
-- Name: chatmessages_id_seq; Type: SEQUENCE; Schema: public; Owner: serialkiller
--

CREATE SEQUENCE public.chatmessages_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.chatmessages_id_seq OWNER TO serialkiller;

--
-- Name: chatmessages_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: serialkiller
--

ALTER SEQUENCE public.chatmessages_id_seq OWNED BY public.chatmessages.id;


--
-- Name: directors; Type: TABLE; Schema: public; Owner: serialkiller
--

CREATE TABLE public.directors (
    id integer NOT NULL,
    name character varying(64) NOT NULL,
    "createdAt" date NOT NULL,
    "updatedAt" date
);


ALTER TABLE public.directors OWNER TO serialkiller;

--
-- Name: directors_id_seq; Type: SEQUENCE; Schema: public; Owner: serialkiller
--

CREATE SEQUENCE public.directors_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.directors_id_seq OWNER TO serialkiller;

--
-- Name: directors_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: serialkiller
--

ALTER SEQUENCE public.directors_id_seq OWNED BY public.directors.id;


--
-- Name: genres; Type: TABLE; Schema: public; Owner: serialkiller
--

CREATE TABLE public.genres (
    id integer NOT NULL,
    name character varying(34) NOT NULL,
    image text NOT NULL,
    slug character varying(34) NOT NULL,
    "createdAt" date NOT NULL,
    "updatedAt" date
);


ALTER TABLE public.genres OWNER TO serialkiller;

--
-- Name: genres_id_seq; Type: SEQUENCE; Schema: public; Owner: serialkiller
--

CREATE SEQUENCE public.genres_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.genres_id_seq OWNER TO serialkiller;

--
-- Name: genres_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: serialkiller
--

ALTER SEQUENCE public.genres_id_seq OWNED BY public.genres.id;


--
-- Name: relationships; Type: TABLE; Schema: public; Owner: serialkiller
--

CREATE TABLE public.relationships (
    id integer NOT NULL,
    "userId" integer,
    "followedUserId" integer,
    "createdAt" date NOT NULL,
    "updatedAt" date
);


ALTER TABLE public.relationships OWNER TO serialkiller;

--
-- Name: relationships_id_seq; Type: SEQUENCE; Schema: public; Owner: serialkiller
--

CREATE SEQUENCE public.relationships_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.relationships_id_seq OWNER TO serialkiller;

--
-- Name: relationships_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: serialkiller
--

ALTER SEQUENCE public.relationships_id_seq OWNED BY public.relationships.id;


--
-- Name: reviews; Type: TABLE; Schema: public; Owner: serialkiller
--

CREATE TABLE public.reviews (
    id integer NOT NULL,
    content text NOT NULL,
    users_id integer NOT NULL,
    shows_id integer NOT NULL,
    "createdAt" date NOT NULL,
    "updatedAt" date
);


ALTER TABLE public.reviews OWNER TO serialkiller;

--
-- Name: reviews_id_seq; Type: SEQUENCE; Schema: public; Owner: serialkiller
--

CREATE SEQUENCE public.reviews_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.reviews_id_seq OWNER TO serialkiller;

--
-- Name: reviews_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: serialkiller
--

ALTER SEQUENCE public.reviews_id_seq OWNED BY public.reviews.id;


--
-- Name: shows; Type: TABLE; Schema: public; Owner: serialkiller
--

CREATE TABLE public.shows (
    id integer NOT NULL,
    title text NOT NULL,
    summary text NOT NULL,
    picture text NOT NULL,
    trailer text NOT NULL,
    year numeric(4,0) NOT NULL,
    slug text NOT NULL,
    genres_id integer NOT NULL,
    "createdAt" date NOT NULL,
    "updatedAt" date
);


ALTER TABLE public.shows OWNER TO serialkiller;

--
-- Name: shows_have_actors; Type: TABLE; Schema: public; Owner: serialkiller
--

CREATE TABLE public.shows_have_actors (
    shows_id integer NOT NULL,
    actors_id integer NOT NULL,
    "createdAt" date NOT NULL,
    "updatedAt" date
);


ALTER TABLE public.shows_have_actors OWNER TO serialkiller;

--
-- Name: shows_have_directors; Type: TABLE; Schema: public; Owner: serialkiller
--

CREATE TABLE public.shows_have_directors (
    shows_id integer NOT NULL,
    directors_id integer NOT NULL,
    "createdAt" date NOT NULL,
    "updatedAt" date
);


ALTER TABLE public.shows_have_directors OWNER TO serialkiller;

--
-- Name: shows_id_seq; Type: SEQUENCE; Schema: public; Owner: serialkiller
--

CREATE SEQUENCE public.shows_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.shows_id_seq OWNER TO serialkiller;

--
-- Name: shows_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: serialkiller
--

ALTER SEQUENCE public.shows_id_seq OWNED BY public.shows.id;


--
-- Name: users; Type: TABLE; Schema: public; Owner: serialkiller
--

CREATE TABLE public.users (
    id integer NOT NULL,
    firstname character varying(35) NOT NULL,
    lastname character varying(35) NOT NULL,
    handle character varying(35) NOT NULL,
    email character varying(254) NOT NULL,
    password character varying(254) NOT NULL,
    slug character varying(35) NOT NULL,
    picture text DEFAULT 'https://vignette.wikia.nocookie.net/villains/images/a/a3/Promopopups_SK.png/revision/latest?cb=20181225031001'::text NOT NULL,
    banner text DEFAULT 'https://i0.wp.com/leserigraphe.com/wp-content/uploads/2015/07/GoT.jpeg?fit=2560%2C1600'::text NOT NULL,
    "createdAt" date NOT NULL,
    "updatedAt" date
);


ALTER TABLE public.users OWNER TO serialkiller;

--
-- Name: users_id_seq; Type: SEQUENCE; Schema: public; Owner: serialkiller
--

CREATE SEQUENCE public.users_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.users_id_seq OWNER TO serialkiller;

--
-- Name: users_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: serialkiller
--

ALTER SEQUENCE public.users_id_seq OWNED BY public.users.id;


--
-- Name: id; Type: DEFAULT; Schema: public; Owner: serialkiller
--

ALTER TABLE ONLY public.actors ALTER COLUMN id SET DEFAULT nextval('public.actors_id_seq'::regclass);


--
-- Name: id; Type: DEFAULT; Schema: public; Owner: serialkiller
--

ALTER TABLE ONLY public.chatmessages ALTER COLUMN id SET DEFAULT nextval('public.chatmessages_id_seq'::regclass);


--
-- Name: id; Type: DEFAULT; Schema: public; Owner: serialkiller
--

ALTER TABLE ONLY public.directors ALTER COLUMN id SET DEFAULT nextval('public.directors_id_seq'::regclass);


--
-- Name: id; Type: DEFAULT; Schema: public; Owner: serialkiller
--

ALTER TABLE ONLY public.genres ALTER COLUMN id SET DEFAULT nextval('public.genres_id_seq'::regclass);


--
-- Name: id; Type: DEFAULT; Schema: public; Owner: serialkiller
--

ALTER TABLE ONLY public.relationships ALTER COLUMN id SET DEFAULT nextval('public.relationships_id_seq'::regclass);


--
-- Name: id; Type: DEFAULT; Schema: public; Owner: serialkiller
--

ALTER TABLE ONLY public.reviews ALTER COLUMN id SET DEFAULT nextval('public.reviews_id_seq'::regclass);


--
-- Name: id; Type: DEFAULT; Schema: public; Owner: serialkiller
--

ALTER TABLE ONLY public.shows ALTER COLUMN id SET DEFAULT nextval('public.shows_id_seq'::regclass);


--
-- Name: id; Type: DEFAULT; Schema: public; Owner: serialkiller
--

ALTER TABLE ONLY public.users ALTER COLUMN id SET DEFAULT nextval('public.users_id_seq'::regclass);


--
-- Data for Name: actors; Type: TABLE DATA; Schema: public; Owner: serialkiller
--

COPY public.actors (id, name, created_at, updated_at) FROM stdin;
4	Issa Rae	2019-10-26	2019-10-26
5	Elisabeth Moss	2019-11-06	\N
6	Yvonne Strahovski	2019-11-06	\N
7	Joseph Fiennes	2019-11-06	\N
8	Samira Wiley	2019-11-06	\N
9	Max Minghella	2019-11-06	\N
10	Henry Cavill	2019-11-06	2019-11-06
11	Eliza Taylor-Cotter	2019-11-06	\N
12	Bob Morley	2019-11-06	\N
13	Paige Turco	2019-11-06	\N
14	Cillian Murphy	2019-11-06	\N
15	Helen McCrory	2019-11-06	\N
16	Paul Anderson	2019-11-06	\N
17	Sophie Rundle	2019-11-06	\N
18	Bryan Cranston	2019-11-06	\N
19	Anna Gunn	2019-11-06	\N
20	Aaron Paul	2019-11-06	\N
21	Dean Norris	2019-11-06	\N
22	RJ Mitte	2019-11-06	\N
23	Betsy Brandt	2019-11-06	\N
24	Bob Odenkirk	2019-11-06	\N
25	Jonathan Banks	2019-11-06	\N
26	Giancarlo Esposito	2019-11-06	\N
27	Andrew Lincoln	2019-11-06	\N
28	Norman Reedus	2019-11-06	\N
29	Steven Yeun	2019-11-06	\N
30	Melissa McBride	2019-11-06	\N
31	Chandler Riggs	2019-11-06	\N
32	Lauren Cohan	2019-11-06	\N
33	Danai Gurira	2019-11-06	\N
34	Jeffrey Dean Morgan	2019-11-06	\N
35	Michael C. Hall	2019-11-06	\N
36	Jennifer Carpenter	2019-11-06	\N
37	James Remar	2019-11-06	\N
38	David Zayas	2019-11-06	\N
39	Oliver Masucci	2019-11-06	\N
40	Karoline Eichhorn	2019-11-06	\N
41	Jördis Triebel	2019-11-06	\N
42	Louis Hofmann	2019-11-06	\N
43	Maja Schöne	2019-11-06	\N
44	Alexandre Astier	2019-11-06	\N
45	Lionnel Astier	2019-11-06	\N
46	Franck Pitiot	2019-11-06	\N
47	Jean-Christophe Hembert	2019-11-06	\N
48	Anne Girouard	2019-11-06	\N
49	Thomas Cousseau	2019-11-06	\N
50	Nicolas Gabion	2019-11-06	\N
51	Anthony Hopkins	2019-11-06	\N
52	Evan Rachel Wood	2019-11-06	\N
53	Thandie Newton	2019-11-06	\N
54	James Marsden	2019-11-06	\N
55	Ed Harris	2019-11-06	\N
56	Jeffrey Wright	2019-11-06	\N
57	Thomas Jane	2019-11-06	\N
58	Steven Strait	2019-11-06	\N
59	Shohreh Aghdashloo	2019-11-06	\N
60	Dominique Tipper	2019-11-06	\N
61	Cas Anvar	2019-11-06	\N
62	Wes Chatham	2019-11-06	\N
63	Bob Odenkirk	2019-11-06	\N
64	Jonathan Banks	2019-11-06	\N
65	Rhea Seehorn	2019-11-06	\N
66	Patrick Fabian	2019-11-06	\N
67	Michael McKean	2019-11-06	\N
68	Michael Mando	2019-11-06	\N
69	David Duchovny	2019-11-06	\N
70	Natascha McElhone	2019-11-06	\N
71	Evan Handler	2019-11-06	\N
72	Madeleine Martin	2019-11-06	\N
73	Pamela Adlon	2019-11-06	\N
74	Taylor Schilling	2019-11-06	\N
75	Laura Prepon	2019-11-06	\N
76	Michael J. Harney	2019-11-06	\N
77	Michelle Hurst	2019-11-06	\N
78	Kate Mulgrew	2019-11-06	\N
79	Jason Biggs	2019-11-06	\N
80	Natasha Lyonne	2019-11-06	\N
81	Simon Astier	2019-11-06	\N
82	Alban Lenoir	2019-11-06	\N
83	Sébastien Lalanne	2019-11-06	\N
84	Gérard Darier	2019-11-06	\N
85	Agnès Boury	2019-11-06	\N
86	Jennie-Anne Walker	2019-11-06	\N
87	William H. Macy	2019-11-06	\N
88	Emmy Rossum	2019-11-06	\N
89	Jeremy Allen White	2019-11-06	\N
90	Noel Fisher	2019-11-06	\N
91	Ethan Cutkosky	2019-11-06	\N
92	Shanola Hampton	2019-11-06	\N
93	Steve Howey	2019-11-06	\N
94	Emma Kenney	2019-11-06	\N
95	Cameron Monaghan	2019-11-06	\N
96	Rami Malek	2019-11-06	\N
97	Christian Slater	2019-11-06	\N
98	Portia Doubleday	2019-11-06	\N
99	Carly Chaikin	2019-11-06	\N
100	Martin Wallström	2019-11-06	\N
101	Alex Lawther	2019-11-06	\N
102	Jessica Barden	2019-11-06	\N
103	Tom Ellis	2019-11-06	\N
104	Lauren German	2019-11-06	\N
105	D. B. Woodside	2019-11-06	\N
106	Lesley-Ann Brandt	2019-11-06	\N
107	Kevin Alejandro	2019-11-06	\N
108	Rachael Harris	2019-11-06	\N
109	Christopher Meloni	2019-11-06	\N
110	Ritchie Coster	2019-11-06	\N
111	Lili Mirojnick	2019-11-06	\N
112	Medina Senghore	2019-11-06	\N
113	Patrick Fischler	2019-11-06	\N
114	Patton Oswalt (voix)	2019-11-06	\N
115	Caitriona Balfe	2019-11-07	\N
116	Sam Heughan	2019-11-07	\N
117	Tobias Menzies	2019-11-07	\N
118	Gabriel Byrne	2019-11-07	\N
119	Elizabeth McGovern	2019-11-07	\N
120	Léa Drucker	2019-11-07	\N
121	Adel Bencherif	2019-11-07	\N
122	Natasha Little	2019-11-07	\N
123	Jason Momoa	2019-11-07	\N
124	Sylvia Hoeks	2019-11-07	\N
125	Alfre Woodard	2019-11-07	\N
126	Charlie Cox	2019-11-07	\N
127	Vincent D'Onofrio	2019-11-07	\N
128	Deborah Ann Woll	2019-11-07	\N
129	Elden Henson	2019-11-07	\N
130	Jon Bernthal	2019-11-07	\N
131	Élodie Yung	2019-11-07	\N
132	Yvonne Orji	2019-11-26	\N
\.


--
-- Name: actors_id_seq; Type: SEQUENCE SET; Schema: public; Owner: serialkiller
--

SELECT pg_catalog.setval('public.actors_id_seq', 133, true);


--
-- Data for Name: chatmessages; Type: TABLE DATA; Schema: public; Owner: serialkiller
--

COPY public.chatmessages (id, content, users_id, "createdAt", "updatedAt") FROM stdin;
177	Hey Salut Marco	15	2019-10-28	2019-10-28
178	Salut Johan	1	2019-10-28	2019-10-28
179	Hello Johan ! T'as vu le dernier épisode de GOT ? Ou bien trop occupé à faire des sockets 	16	2019-10-29	2019-10-29
180	J'ai juste envie qu'ils sortent une nouvelle saison d'Insecure <3	16	2019-10-29	2019-10-29
181	Bonjour je suis fatigué	1	2019-10-29	2019-10-29
182	Pas grave tu vas bossé quand même	15	2019-10-29	2019-10-29
185	Johan	1	2019-10-29	2019-10-29
186	Johan	1	2019-10-29	2019-10-29
187	Kikooooooo les gars	17	2019-10-29	2019-10-29
191	Hey l'équipe	18	2019-10-29	2019-10-29
193	Johan !	18	2019-10-29	2019-10-29
194	Peter	15	2019-10-29	2019-10-29
195	<3	18	2019-10-29	2019-10-29
196	<3	15	2019-10-29	2019-10-29
197	Salut les gars	17	2019-10-29	2019-10-29
200	Sorry :D	17	2019-10-29	2019-10-29
201	Ouai lulu <3 !	18	2019-10-29	2019-10-29
202	Hey	15	2019-10-29	2019-10-29
203	:D ça marche >3	17	2019-10-29	2019-10-29
205	<3	17	2019-10-29	2019-10-29
206	eheh	17	2019-10-29	2019-10-29
207	Genius team	15	2019-10-29	2019-10-29
208	!	18	2019-10-29	2019-10-29
209	Topissime	18	2019-10-29	2019-10-29
212	Super, pour les messages qui se place	17	2019-10-29	2019-10-29
213	Voyons le comportement d'un mlessage assez plutôt beaucoup bien plus long alors ?	18	2019-10-29	2019-10-29
214	:)	19	2019-10-29	2019-10-29
215	gg	18	2019-10-29	2019-10-29
216	😐	18	2019-10-29	2019-10-29
217	😀	18	2019-10-29	2019-10-29
224	GG	15	2019-10-29	2019-10-29
225	#teamcasadepapel	16	2019-10-30	2019-10-30
228	hello ! nouvelle inscrite ici et bien décidée à vous troller 😈	20	2019-10-30	2019-10-30
229	*à vous SPOILER 😈😈😈😈😈😈	20	2019-10-30	2019-10-30
261	Vous avez vu le dernier épisode de GOT ?? 	16	2019-11-06	2019-11-06
262	Chui en P--L--S !!!!	16	2019-11-06	2019-11-06
266	C'est trop bien 	41	2019-11-07	2019-11-07
268	Eh salut 😀	15	2019-11-07	2019-11-07
269	Merci Mathieu !! :)	16	2019-11-07	2019-11-07
270	Holà :D 	19	2019-11-07	2019-11-07
272	Hola Juju !	16	2019-11-07	2019-11-07
273	Et Johan ^^	16	2019-11-07	2019-11-07
274	Hello Johan	18	2019-11-07	2019-11-07
275	Bonjour	16	2019-11-07	2019-11-07
276	Super cette présentation !	18	2019-11-07	2019-11-07
277	J'adore	18	2019-11-07	2019-11-07
278	C'est beau	16	2019-11-07	2019-11-07
279	Au top !	19	2019-11-07	2019-11-07
280	Hey hello world !	18	2019-11-07	2019-11-07
281	Hello	16	2019-11-07	2019-11-07
282	Hello hello	19	2019-11-07	2019-11-07
283	Super ta présentation !	18	2019-11-07	2019-11-07
284	Youhou	16	2019-11-07	2019-11-07
285	Yeah !	18	2019-11-07	2019-11-07
286	Bien joué l'équipe !	18	2019-11-07	2019-11-07
287	The witcher ça va être de la bombe !	18	2019-11-07	2019-11-07
288	!!	18	2019-11-07	2019-11-07
289	Cool... Bravo	44	2019-11-09	2019-11-09
291	Toujours aussi fan de notre site <3	16	2019-11-16	2019-11-16
292	On est motivée pour le TP :muscle:	16	2019-12-13	2019-12-13
\.


--
-- Name: chatmessages_id_seq; Type: SEQUENCE SET; Schema: public; Owner: serialkiller
--

SELECT pg_catalog.setval('public.chatmessages_id_seq', 305, true);


--
-- Data for Name: directors; Type: TABLE DATA; Schema: public; Owner: serialkiller
--

COPY public.directors (id, name, "createdAt", "updatedAt") FROM stdin;
2	Derrick	2019-10-25	2019-10-25
4	George	2019-10-25	2019-10-25
5	Benala	2019-10-25	2019-10-25
6	Issa Rae	2019-10-26	2019-10-26
7	Cecile Emeke	2019-10-28	\N
8	Reed Morano	2019-10-28	\N
9	Kate Dennis	2019-10-28	\N
11	Lauren Schmidt Hissrich	2019-11-06	2019-11-06
13	Jason Rothenberg	2019-11-06	\N
14	Steven Knight	2019-11-06	\N
15	Vince Gilligan	2019-11-06	\N
16	Frank Darabont	2019-11-06	\N
17	Robert Kirkman	2019-11-06	\N
18	James Manos Jr.	2019-11-06	\N
19	Baran bo Odar	2019-11-06	\N
20	Alexandre Astier	2019-11-06	\N
21	Eiichirō Oda	2019-11-06	\N
22	Hajime Isayama	2019-11-06	\N
23	Yasuhiro Nightow	2019-11-06	\N
24	Jeffrey Addiss	2019-11-06	\N
25	Will Matthews	2019-11-06	\N
26	Jonathan Nolan	2019-11-06	\N
27	Lisa Joy	2019-11-06	\N
28	Dennis Quaid	2019-11-06	\N
29	Laurence Mark	2019-11-06	\N
30	Gary Fleder	2019-11-06	\N
31	Vince Gilligan	2019-11-06	\N
32	Peter Gould	2019-11-06	\N
33	Tom Kapinos	2019-11-06	\N
34	Jenji Kohan	2019-11-06	\N
35	Simon Astier	2019-11-06	\N
36	Alban Lenoir	2019-11-06	\N
37	John Wells	2019-11-06	\N
38	Sam Esmail	2019-11-06	\N
39	Charlie Covell	2019-11-06	\N
10	Kari Skogland	2019-10-28	\N
40	Tom Kapinos	2019-11-06	\N
41	Grant Morrison	2019-11-06	\N
42	Darick Robertson	2019-11-06	\N
43	Tite Kubo	2019-11-07	\N
44	Yūsei Matsui	2019-11-07	\N
45	Ronald D. Moore	2019-11-07	\N
46	David Fincher	2019-11-07	\N
47	Joshua Donen	2019-11-07	\N
48	Jennifer Miller	2019-11-07	\N
49	Tim Miller	2019-11-07	\N
50	Howard Overman	2019-11-07	\N
51	Francis Lawrence	2019-11-07	\N
52	Yoshihiro Togashi	2019-11-07	\N
53	Drew Goddard	2019-11-07	\N
\.


--
-- Name: directors_id_seq; Type: SEQUENCE SET; Schema: public; Owner: serialkiller
--

SELECT pg_catalog.setval('public.directors_id_seq', 54, true);


--
-- Data for Name: genres; Type: TABLE DATA; Schema: public; Owner: serialkiller
--

COPY public.genres (id, name, image, slug, "createdAt", "updatedAt") FROM stdin;
6	Comédie	https://parismatch.be/app/uploads/2018/12/shledoncooper.jpg	comedie	2019-10-24	2019-10-24
7	Comédie dramatique	https://www.cjoint.com/doc/19_11/IKgtiQSvnxA_insecure-still.jpg	comedie-dramatique	2019-10-24	2019-10-24
11	Science-fiction	https://hips.hearstapps.com/pop.h-cdn.co/assets/cm/15/05/640x467/54ca627889f78_-_sci-fi-tv-03-0313-lgn.jpg?	science-fiction	2019-10-24	2019-10-24
9	Animes	https://www.manga-news.com/public/images/dvd_volumes/screenshots/DBZ-kai-screen-1.jpg	animes	2019-10-24	2019-10-24
8	Thriller	https://cdn-media.rtl.fr/cache/R-WJkrfq0V4-aZmhN0BZrA/880v587-0/online/image/2018/0330/7792840044_le-gang-de-braqueurs-de-la-casa-de-papel.jpg	thriller	2019-10-24	2019-10-24
10	Fantastique	https://ladygeekgirl.files.wordpress.com/2013/07/jaime-lannister-ibd-2.jpg	fantastique	2019-10-24	2019-10-24
\.


--
-- Name: genres_id_seq; Type: SEQUENCE SET; Schema: public; Owner: serialkiller
--

SELECT pg_catalog.setval('public.genres_id_seq', 12, true);


--
-- Data for Name: relationships; Type: TABLE DATA; Schema: public; Owner: serialkiller
--

COPY public.relationships (id, "userId", "followedUserId", "createdAt", "updatedAt") FROM stdin;
437	47	1	2019-12-13	2019-12-13
442	48	16	2019-12-17	2019-12-17
125	1	16	2019-11-04	2019-11-04
178	37	16	2019-11-06	2019-11-06
179	37	15	2019-11-06	2019-11-06
180	37	19	2019-11-06	2019-11-06
139	1	15	2019-11-04	2019-11-04
190	38	16	2019-11-06	2019-11-06
195	15	16	2019-11-06	2019-11-06
196	15	1	2019-11-06	2019-11-06
146	15	19	2019-11-04	2019-11-04
201	18	15	2019-11-06	2019-11-06
203	18	16	2019-11-06	2019-11-06
205	19	15	2019-11-07	2019-11-07
206	19	16	2019-11-07	2019-11-07
209	18	1	2019-11-07	2019-11-07
210	18	37	2019-11-07	2019-11-07
211	18	27	2019-11-07	2019-11-07
212	18	38	2019-11-07	2019-11-07
215	18	19	2019-11-08	2019-11-08
492	16	43	2020-01-03	2020-01-03
494	16	15	2020-01-04	2020-01-04
500	16	19	2020-01-07	2020-01-07
\.


--
-- Name: relationships_id_seq; Type: SEQUENCE SET; Schema: public; Owner: serialkiller
--

SELECT pg_catalog.setval('public.relationships_id_seq', 500, true);


--
-- Data for Name: reviews; Type: TABLE DATA; Schema: public; Owner: serialkiller
--

COPY public.reviews (id, content, users_id, shows_id, "createdAt", "updatedAt") FROM stdin;
1	Aaaaah cette série !! Trop de la bombe !	1	9	2019-10-27	2019-10-27
5	Issa WE NEED A NEW SEASON!!! Et t'as intérêt de t'éloigner de Daniel	16	9	2019-10-29	\N
69	#teamsheldon me suis complètement reconnue dans son personnage. askip y'a un spinoff de lui enfant, j'espère que c'est aussi bien que TBBT.	20	11	2019-10-30	2019-10-30
70	J'adore la photographie. J'ai vraiment l'impression d'être à LA quand je regarde cette série ! magnifique	20	9	2019-10-30	2019-10-30
8	Cette série m'a fait découvrir le concept de body-positive pool party. Je trouve ça génial ! Merci Shrill ;)	16	3	2019-10-29	2019-10-29
9	Comment ils ont pu nous faire une fin comme ça ????	1	14	2019-10-29	2019-10-29
193	J'aime cette fin !	18	14	2019-11-06	2019-11-06
194	Vraiment énorme, super série !	18	32	2019-11-06	2019-11-06
195	J'ai arrêté de regarder après la mort de Poussey. Un scandale	16	35	2019-11-06	2019-11-06
15	Toute mon enfance	1	13	2019-10-30	2019-10-30
18	Super bien conçu	1	15	2019-10-30	2019-10-30
200	Très bonne série, vive sangoku	41	13	2019-11-07	2019-11-07
201	J'adoooore	19	11	2019-11-07	2019-11-07
202	Lucifer: un plaisir pour les yeux 	19	40	2019-11-07	2019-11-07
203	J'ai adoré cette série	16	49	2019-11-07	2019-11-07
204	Excellent Saul Goodman ! J'adore !	18	33	2019-11-07	2019-11-07
205	Daenerys <3	19	14	2019-11-07	2019-11-07
206	Belle intrigue, bien fait !	18	31	2019-11-07	2019-11-07
207	Je ne connais pas, à voir :)	16	33	2019-11-07	2019-11-07
208	Déchéance et grâce...  Californication renvoie explicitement aux œuvres de Bukowski ! Très bon !	18	34	2019-11-07	2019-11-07
209	Connais pas mais ça à l'air complétement décalé ! A voir	18	39	2019-11-07	2019-11-07
210	C'est pas mal ! Du renouveau dans l'univers Ange & Démons	18	40	2019-11-07	2019-11-07
211	C'est pas faux	16	26	2019-11-07	2019-11-07
212	Vraiment excellent ! Ça peut paraître long au démarrage mais c'est un réel plaisir à regarder! Grosse intrique, suspens et imprévisible !	18	25	2019-11-07	2019-11-07
213	Attise ma curiosité	18	41	2019-11-07	2019-11-07
214	RIP Hopper :(	19	10	2019-11-07	2019-11-07
215	Pas mal ! 	18	20	2019-11-08	2019-11-08
216	Comment un cadavre en décomposition peut avoir de la force ?!	45	23	2019-12-09	2019-12-09
40	oooooUUU DAMMIT! lol! Titus c'est trop mon gars sûr	16	16	2019-10-30	2019-10-30
241	Des fous rires en série !	47	16	2019-12-13	2019-12-13
71	Hyper réaliste. Un véritable cautionary tale. Du coup c'est très glaçant, je suis toujours mal à l'aise quand je regarde cette série mais en même temps c'est hyper addictif. On doit se réveiller avant qu'il ne nous arrive la même chose.	1	12	2019-11-06	\N
72	Je commente parce que j'ai vu quelques extraits et je suis même allée jusqu'à voir des critiques... Mais malgré ma fascination pour le concept, je pourrai jamais regarder, j'en ferais des cauchemars pendant des semaines	16	12	2019-11-06	\N
73	Si vous aimez les dystopies, allez-y, c'est bien flippant comme il faut	15	12	2019-11-06	\N
180	Comment ils ont pu nous faire une fin comme ça ? REMBOURSEMENT !!!!!!!!!!	16	14	2019-11-06	2019-11-06
256	Trop deg que cette série se soit terminée !!	47	24	2019-12-18	2019-12-18
182	Un kiff d'enfance	16	13	2019-11-06	2019-11-06
183	Une réalisation aux petits oignons	16	15	2019-11-06	2019-11-06
184	Récente découverte ! Je suis complètement accro	16	21	2019-11-06	2019-11-06
185	Une petite teen story comme on les aime	16	10	2019-11-06	2019-11-06
187	C'est possible de pas aimer cette série ? 	16	11	2019-11-06	2019-11-06
257	De l'extraordinaire dans de l'ordinaire. Une formule qui marche souvent et tout particulièrement dans Dexter !	16	24	2019-12-18	2019-12-18
\.


--
-- Name: reviews_id_seq; Type: SEQUENCE SET; Schema: public; Owner: serialkiller
--

SELECT pg_catalog.setval('public.reviews_id_seq', 270, true);


--
-- Data for Name: shows; Type: TABLE DATA; Schema: public; Owner: serialkiller
--

COPY public.shows (id, title, summary, picture, trailer, year, slug, genres_id, "createdAt", "updatedAt") FROM stdin;
3	Shrill	Une série 100% body positive où on suit le quotidien d''Annie, ses coups de poker pour se démarquer au travail, ses déboires avec l''homme qu''elle voit et sa relation tendre et parfois complexe avec ses parents.	https://www.bitchmedia.org/sites/default/files/styles/article_page_featured_image/public/article-images/SHR_104_20180829_AR-_0176RT.jpg?itok=gGrGfvzS	https://www.youtube.com/embed/JyUr_-jxWZA	2019	shrill	6	2019-10-26	2019-10-26
15	Narcos	Loin d’un simple biopic de Pablo Escobar, Narcos retrace la lutte acharnée des États-Unis et de la Colombie contre le cartel de la drogue de Medellín, l’organisation la plus lucrative et impitoyable de l’histoire criminelle moderne. En multipliant les points de vue — policier, politique, judiciaire et personnel — la série dépeint l’essor du trafic de cocaïne et le bras de fer sanglant engagé avec les narcotrafiquants qui contrôlent le marché avec violence et ingéniosité.	https://vl-media.fr/wp-content/uploads/2016/08/narcos_netflix.jpg	https://www.youtube.com/embed/VIV7ujo7i7E	2015	narcos	8	2019-10-26	2019-10-26
13	Dragon Ball Z	Dragon Ball Z se déroule cinq ans après le mariage de Son Goku et de Chichi, désormais parents de Son Gohan2. Raditz, un mystérieux guerrier extraterrestre, frère de Son Goku, arrive sur Terre pour retrouver Goku. Ce dernier apprend qu''il vient d''une plan	https://defense-92.fr/wp-content/uploads/2018/03/dragon-ball-z.jpg	https://www.youtube.com/embed/8ABbs3ryZoI	1989	dragon-ball-z	9	2019-10-26	2019-10-26
16	Unbreakable Kimmy Schmidt	Kimmy Schmidt, une jeune femme de 29 ans originaire de l''Indiana, part vivre à New York après avoir passé quinze ans sous terre dans un bunker, en compagnie de trois autres femmes. Elles étaient prisonnières d''un gourou leur ayant fait croire que l''Apocalypse avait eu lieu.	http://www.premiere.fr/sites/default/files/styles/scale_crop_1280x720/public/2019-01/unbreakable-kimmy-schmidt-season-4-image-3.jpeg	https://www.youtube.com/embed/Hl4bOuGNMwo	2015	unbreakable-kimmy-schmidt	6	2019-10-27	2019-10-27
19	The Witcher	À travers les plaines arides et les montagnes escarpées des Royaumes du Nord, un homme avance seul. En ces temps obscurs, il est l''un des rares à ne pas craindre les terribles créatures qui croisent sa route. Car Geralt de Riv est un sorceleur : un mercenaire initié aux secrets d''une ancienne magie. Il suit son propre code de l''honneur dans un monde qui a oublié le sien, avec l''espoir inavoué de réaliser son dernier voeu : retrouver son humanité.	https://upload.wikimedia.org/wikipedia/fr/1/14/The_Witcher_%28s%C3%A9rie_t%C3%A9l%C3%A9vis%C3%A9e%29_Logo.png	https://www.youtube.com/embed/OHo3WQA7tG8	2019	the-witcher	10	2019-11-06	2019-11-06
28	L'Attaque des Titans	Dans un monde ravagé par des titans mangeurs d’homme depuis plus d’un siècle, les rares survivants de l’Humanité n’ont d’autre choix pour survivre que de se barricader dans une cité-forteresse. Le jeune Eren, témoin de la mort de sa mère dévorée par un titan, n’a qu’un rêve : entrer dans le corps d’élite chargé de découvrir l’origine des Titans et les annihiler jusqu’au dernier…	https://upload.wikimedia.org/wikipedia/fr/thumb/9/94/Attaque_des_Titans_CMJN.svg/1024px-Attaque_des_Titans_CMJN.svg.png	https://www.youtube.com/embed/YHK2P9ZKAtc	2009	l-attaque-des-titans	9	2019-11-06	2019-11-06
26	Kaamelott	Deuxième moitié du ve siècle, île de Bretagne. Alors que l’Empire romain s’effondre et que le christianisme s’impose peu à peu face aux dieux païens, le royaume de Logres s’organise autour de son souverain, le roi Arthur, qui règne depuis le château de Kaamelott ; entouré de ses fidèles chevaliers, il s’attelle à la mission que les dieux lui ont confiée : rechercher le Saint Graal.\n\nMais cette quête s’annonce plus que difficile, car Arthur est très mal entouré. Ses chevaliers de la Table Ronde sont un faible renfort contre les défis qui se dressent sur la route : peureux, naïfs, stupides ou au contraire violents, archaïques et désordonnés, les troupes de Bretagne ne comprennent pas l’enjeu de la quête du Graal et peinent à se rendre utiles. L’entourage familial du roi n’est guère plus sensé : son quotidien déjà bien chargé est parsemé de conflits avec sa femme Guenièvre ou sa belle-famille. Pour couronner le tout, le pays est régulièrement la cible d’incursions barbares.\n\nLes premiers jours de paix après la construction de Kaamelott et les débuts de la Quête du Graal cèdent vite la place à un quotidien plus difficile et morose pour le roi, qui doit maîtriser à la fois son caractère dépressif et les incessantes bourdes de son entourage tout en essayant de gouverner son royaume à sa manière, moderne et progressiste. Un combat de tous les jours où le roi légendaire va connaître bien des déboires.	https://www.bfmtv.com/i/0/0/395/8a6c8c6e89d86e1118f3219b87557.jpg	https://www.youtube.com/embed/p5UJMxBErmk	2005	kaamelott	6	2019-11-06	2019-11-06
11	The Big Bang Theory	Leonard Hofstadter et Sheldon Cooper vivent en colocation à Pasadena, ville de l''agglomération de Los Angeles. Ce sont tous deux des physiciens surdoués, « geeks » de surcroît. C''est d''ailleurs autour de cela qu''est axée la majeure partie comique de la sé	http://golem13.fr/wp-content/uploads/2019/01/the-big-bang-theory-saison-est-debut-fin_width1024-640x460.jpg	https://www.youtube.com/embed/WBb3fojgW0Q	2007	the-big-bang-theory	6	2019-10-26	2019-10-26
30	Dark Crystal : Le Temps de la résistance	Trois Gelflings, Rian, Brea et Deet, découvrent le secret des maléfiques Skeksès dont le pouvoir ne cesse d''augmenter. Les Gelflings entament alors une quête pour susciter un mouvement de résistance et sauver le monde de Thra.	https://3238leblogdemarvelll-1278.kxcdn.com/wp-content/uploads/2019/09/Dark-Crystal-Le-temps-de-la-r%C3%A9sistance-Saison-1-Poster-Officiel-850x446-1568974966.jpg	https://www.youtube.com/embed/G8tfHQ3q2Bg	2019	dark-crystal	10	2019-11-06	2019-11-06
12	The Handmaid's Tale	Dans un avenir proche, la combinaison de pollutions environnementales et de maladies sexuellement transmissibles a entraîné une baisse dramatique de la fécondité qui a pour conséquence un taux de natalité extrêmement bas. Les « Fils de Jacob », une secte politico-religieuse protestante de type restaurationniste et aux accents fondamentalistes, en a profité pour prendre le pouvoir, détruisant la Maison-Blanche, la Cour suprême et le Congrès lors d''un coup d''État.	https://wallpapercave.com/wp/wp2186840.jpg	https://www.youtube.com/embed/JPVrg4kkuPw	2017	the-handmaids-tale	11	2019-10-26	2019-10-26
10	Stranger Things	L''intrigue s''étale sur plusieurs mois voire plusieurs années, entre 1983 et 1985.\n\nUn soir de novembre 1983 à Hawkins, dans l''Indiana, le jeune Will Byers, douze ans, disparaît brusquement sans laisser de traces, hormis son vélo. Plusieurs personnages von	https://upload.wikimedia.org/wikipedia/commons/3/38/Stranger_Things_logo.png	https://www.youtube.com/embed/YEG3bmU_WaI	2016	stranger-things	11	2019-10-25	2019-10-25
25	Dark	En 2019, le policier Ulrich Nielsen cherche désespérément son fils disparu, Mikkel, âgé de 12 ans. 33 ans plus tôt, en 1986, c''est son petit-frère Mads qui a disparu dans des circonstances tout aussi mystérieuses. Dans la ville de Winden, ce sont quatre familles, traumatisées par cette disparition, qui tentent de résoudre les mystères qui entourent la ville et sa région. Jonas Kahnwald est lui aussi marqué par cette affaire mais également par le suicide de son père. Il va tenter d''en savoir plus.\n\nLes investigations des policiers et de certains habitants vont mettre en lumière une histoire qui recommence tous les 33 ans. Des évènements se déroulant en 1953, 1986 et 2019 sont étroitement liés.	https://static.next-episode.net/tv-shows-images/huge/dark.jpg	https://www.youtube.com/embed/VsLr5w_hM9c	2017	dark	11	2019-11-06	2019-11-06
32	The Expanse	200 ans dans le futur, le système solaire est entièrement colonisé. Le détective Josephus Miller, né sur la Station Cérès dans la ceinture d''astéroïdes, a pour mission de retrouver une jeune femme, Julie Mao. Il est bientôt épaulé dans sa tâche par James Holden, second du cargo spatial impliqué dans un incident qui va exacerber les relations tendues entre une Terre dirigée par les Nations unies appauvrie en ressource, la République du Congrès martien, prospère et de plus en plus puissante, et les colonies de la ceinture d''astéroïdes, dirigées par la Terre et Mars et dont les natifs sont surexploités. Ils vont bientôt découvrir que la disparition de la jeune femme est liée à une vaste conspiration qui menace la paix dans le système solaire et la survie de l''humanité.	https://i2.wp.com/hnentertainment.co/wp-content/uploads/2019/08/THE-EXPANSE_SEASON-5_TORONTO_OCTOBER_START_AMAZON_.jpg?fit=1400%2C717&ssl=1	https://www.youtube.com/embed/eDJ6uSVcVM8	2015	the-expanse	11	2019-11-06	2019-11-06
31	Westworld	Westworld est un parc d''attractions futuriste recréant différents univers, dont l''univers de l''Ouest américain (Far West) du xixe siècle. Il est peuplé d''androïdes, appelés « hôtes » (hosts), réinitialisés à la fin de chaque boucle narrative. Les visiteurs, appelés « invités » (newcomers ou guests) peuvent y faire ce qu''ils veulent sans aucune conséquence. Mais à la suite d''une mise à jour du programme des androïdes, les dirigeants du parc devront faire face à plusieurs bugs dans leur comportement.	https://images-na.ssl-images-amazon.com/images/I/91y0VnqV58L._RI_.jpg	https://www.youtube.com/embed/Ayp8MELBVtw	2016	westworld	11	2019-11-06	2019-11-06
29	Gungrave	L’histoire démarre et un camion est encerclé de monstres à l'apparence humaine. Un savant et une jeune fille se trouvent à bord dans une situation bien délicate. Heureusement, le savant réveille Brandon. L'homme est une véritable machine de guerre, il extermine aisément la foule de monstres à l'aide de ses deux énormes armes (les cerberus). Mais que cache cette attaque, quelle est l'histoire de nos protagonistes, et qui est véritablement Brandon alias « Beyond the Grave ». 'est ce que l''on découvre au cours d''un long flashback retraçant la vie de deux jeunes voyous entrant dans l''organisation criminelle qui dirige leur ville.	https://rukminim1.flixcart.com/image/352/352/jmqmpow0/poster/g/r/s/medium-athah-anime-gungrave-13-19-inches-wall-poster-matte-original-imaf9k7pnhgeu7ed.jpeg?q=70	https://www.youtube.com/embed/ifBJz5QT7Sw	2003	gungrave	9	2019-11-06	2019-11-06
27	One Piece	Il fut un temps où Gold Roger était le plus grand de tous les pirates, le « Roi des Pirates » était son surnom. A sa mort, son trésor d''une valeur inestimable connu sous le nom de '"One Piece'" fut caché quelque part sur '"Grand Line'". De nombreux pirates sont partis à la recherche de ce trésor mais tous sont morts avant même de l''atteindre. Monkey D. Luffy rêve de retrouver ce trésor légendaire et de devenir le nouveau '"Roi des Pirates'". Après avoir mangé un fruit du démon, il possède un pouvoir lui permettant de réaliser son rêve. Il lui faut maintenant trouver un équipage pour partir à l''aventure !	https://vignette.wikia.nocookie.net/onepiece/images/8/87/One_Piece_Anime_Logo.png/revision/latest?cb=20150228003322&path-prefix=fr	https://www.youtube.com/embed/bv7BoRBeKuU	1997	one-piece	9	2019-11-06	2019-11-06
14	Game of Thrones	Sur le continent d''Essos, au sud-est au-delà du Détroit, l''héritier « légitime » en exil des Sept Couronnes, Viserys Targaryen, se prépare à reconquérir le royaume. Prêt à tout, il marie sa jeune sœur, la princesse Daenerys Targaryen, à Khal Drogo, seigne	https://img-s-msn-com.akamaized.net/tenant/amp/entityid/BBV3qrT.img?h=0&w=720&m=6&q=60&u=t&o=f&l=f&x=313&y=208	https://www.youtube.com/embed/uNXOkRKivEU	2011	game-of-thrones	10	2019-10-26	2019-10-26
41	Happy!	Nick Sax est un ancien policier, désormais tueur à gage sans domicile fixe, drogué et cynique. Après avoir été blessé par balle et laissé pour mort, il est pris en charge par des ambulanciers qui lui prodiguent les premiers soins d''urgence. Lorsqu''il revient à lui, il est désormais capable de voir Happy, une minuscule licorne volante bleue particulièrement bavarde. Happy est l''ami imaginaire d''une petite fille nommée Hailey, kidnappée par un fou déguisé en Père Noël. Lorsqu''il découvre qu''Hailey est l''enfant qu''il a eu avec son ex-femme, Nick accepte d''aider Happy à partir à la recherche de la fillette et d''affronter les pires gangsters de la ville.	http://sharekult.com/sharekult.com/wp-content/uploads/2018/07/happy-wallpaper.jpg	https://www.youtube.com/embed/wXiezKCcs7I	2017	happy	7	2019-11-06	2019-11-06
20	The 100	Quatre-vingt-dix-sept ans après un holocauste nucléaire qui a décimé la population de la Terre, les seuls Terriens survivants sont ceux qui se trouvaient à ce moment-là dans une des douze stations spatiales en orbite. Depuis, ces douze stations spatiales ont été reliées entre elles et réorganisées afin de garder leurs habitants en vie. Ce groupe de stations se nomme l''Arche. Celle-ci compte maintenant plus de 2 400 habitants. Trois générations se sont ensuite succédé dans l''espace mais les ressources s''épuisent. Des mesures draconiennes ont donc été prises : la peine de mort chez les majeurs et le maximum d''un enfant par couple sont à l''ordre du jour. De plus, les dirigeants de l''Arche font des choix impitoyables pour assurer leur futur, notamment exiler secrètement un groupe de 100 prisonniers mineurs à la surface de la Terre pour savoir si elle est redevenue habitable. Pour la première fois depuis près d''un siècle, des humains retournent sur la planète Terre.\n\nParmi les 100 exilés, il y a Clarke, la brillante adolescente, fille de l''officier médical en chef de l''Arche ; Wells, le fils du Chancelier ; Finn le « Bad-boy » de la bande, le duo Bellamy et Octavia, que la fraternité a toujours poussé à enfreindre les règles, ainsi que Jasper et Monty, meilleurs amis depuis leur enfance. Privés de communication avec la Terre, les dirigeants de l''Arche – la mère de Clarke, Abby, le chancelier Jaha et son commandant en second, Kane – doivent prendre des décisions difficiles au sujet de la vie, de la mort et de la survie de l''espèce humaine. Pour les 100 survivants, la Terre est une planète étrangère dont ils ignorent tout, c''est un royaume mystérieux qui peut être magique un instant et mortel l''instant suivant. La survie de l''espèce humaine repose sur les 100, ils doivent parvenir à transcender leurs différences afin de survivre.	https://images.justwatch.com/backdrop/8628869/s1440/The-100	https://www.youtube.com/embed/qj8kHtRawHY	2014	the-100	11	2019-11-06	2019-11-06
9	Insecure	Issa Rae met en lumière la vie des millenials afro-américains de Los Angeles.	https://www.hbo.com/content/dam/hbodata/series/insecure/episodes/s02/insecure-s02-ka-1920.jpg/_jcr_content/renditions/cq5dam.web.1200.675.jpeg	https://www.youtube.com/embed/dD3RNaOT_JE	2016	insecure	7	2019-10-26	2019-10-26
22	Breaking Bad	Walter « Walt » White est professeur de chimie dans un lycée, et vit avec son fils handicapé et sa femme enceinte à Albuquerque, au Nouveau-Mexique. Lorsqu''on lui diagnostique, peu après qu''il a fêté ses 50 ans, un cancer du poumon en phase terminale avec une espérance de vie estimée à deux ans, tout s''effondre pour lui. Il décide alors de mettre en place un laboratoire et un trafic de méthamphétamine pour assurer un avenir financier confortable à sa famille après sa mort, en s''associant à Jesse Pinkman, un de ses anciens élèves devenu petit trafiquant.	http://www.premiere.fr/sites/default/files/styles/scale_crop_1280x720/public/2018-11/BBS5B-Gallery-1730-RGB-V1-Brown-jpg_202040.jpg	https://www.youtube.com/embed/dlnKTmdqxn4	2008	breaking-bad	8	2019-11-06	2019-11-06
21	Peaky Blinders	Basée sur l''histoire du gang des Peaky Blinders, actif à la fin du xixe siècle, cette série suit un groupe de gangsters de Birmingham à partir de 1919. Cette bande, emmenée par l''ambitieux et dangereux Thomas Shelby et formée de sa fratrie, pratique le racket, la protection, la contrebande d''alcool et de tabac et les paris illégaux. Un vol d''armes automatiques dont ils sont les premiers soupçonnés pousse Winston Churchill à déléguer sur place l''inspecteur en chef Chester Campbell, officier de la police royale irlandaise qui emporte avec lui certaines méthodes expéditives...	https://parismatch.be/app/uploads/2019/01/14674380-low_res-peaky-blinders-iv1-1100x715.jpg	https://www.youtube.com/embed/F16x9poSXrc	2013	peaky-blinders	8	2019-11-06	2019-11-06
33	Better Call Saul	La série est centrée sur la vie de Jimmy McGill, avocat sans envergure, avant qu''il ne devienne l''homme de loi véreux Saul Goodman et qu''il ne rencontre les futurs trafiquants de méthamphétamine Walter White et Jesse Pinkman13.	https://p1.cineserie.com/www.cineserie.com/wp-content/uploads/2019/04/better-call-saul-la-saison-5-sortira-qu-en-2020-1.png?resize=660%2C330&ssl=1&ver=1	https://www.youtube.com/embed/IhZ8vQmeFCk	2015	better-call-saul	6	2019-11-06	2019-11-06
24	Dexter	Victime d''un traumatisme dans son enfance, Dexter Morgan est adopté par un officier de la police de Miami, Harry Morgan.\n\nDevenu adulte, Dexter est présenté comme un tueur en série. Pour masquer cette activité de tueur, Dexter travaille pour la police de Miami, au département de la Criminelle : il y est expert en médecine légale spécialisé dans l''analyse de traces de sang.\n\nDexter se dit incapable de ressentir la moindre émotion, sinon lorsqu''il satisfait des pulsions meurtrières. Harry, son père adoptif, lui a appris à canaliser ses pulsions meurtrières ; et de fait, Dexter ne tue que les criminels qui sont parvenus à échapper au système judiciaire.\n\nBien que sa soif de tuer lui pèse, Dexter parvient à mener une existence relativement normale et à sauver les apparences auprès de sa sœur Debra Morgan, ses collègues, ses amis et sa petite amie Rita Bennett.	https://static.lexpress.fr/medias_1596/w_480,h_270,c_fill,g_north/v1375968250/dexter-affiche-promo-saison-5_817635.jpg	https://www.youtube.com/embed/_9YrRq23l2M	2006	dexter	8	2019-11-06	2019-11-06
23	The Walking Dead	L''histoire suit le personnage de Rick Grimes (interprété par Andrew Lincoln), adjoint du shérif du comté de Kings (en Géorgie) qui se réveille d''un coma de plusieurs semaines pour découvrir que la population a été ravagée par une épidémie post-apocalyptique inconnue qui transforme les êtres humains en morts-vivants, appelés « rôdeurs ». Après avoir retrouvé sa famille, il devient très vite le leader d''un groupe de rescapés d''Atlanta. Ils seront amenés à devoir survivre dans un monde post-apocalyptique face à des rôdeurs et d''autres groupes de survivants, pour certains plus dangereux encore que les rôdeurs eux-mêmes. Ensemble, ils vont devoir tant bien que mal faire face à ce nouveau monde devenu méconnaissable, à travers leur périple dans le Sud profond des États-Unis.	https://www.lemagducine.fr/wp-content/uploads/2019/10/fear-the-walking-dead-serie-amc-saison-5-critique.jpg	https://www.youtube.com/embed/AbtiqJGhWyY	2010	the-walking-dead	8	2019-11-06	2019-11-06
34	Californication	Hank Moody est un romancier new-yorkais exilé à Los Angeles, et séparé de Karen, la mère de sa fille Becca, âgée de 12 ans. Perturbé par sa situation familiale et par son absence d''inspiration, il se réconforte dans la consommation immodérée d''alcool, de drogues en tout genre et des nombreuses femmes tombées sous son charme. Désabusé et sarcastique, il ne peut s''empêcher de dire toutes les vérités qui lui viennent à l''esprit, et ce, en toutes circonstances et à n''importe qui, n''ayant que très peu de respect pour les conventions de la bourgeoisie californienne. Hank est auto-destructeur, mais dans le fond il ne cherche qu''à récupérer Karen et à vivre une vie de famille tranquille…	https://cdn2us.denofgeek.com/sites/denofgeekus/files/styles/main_wide/public/californication.jpg?itok=ooN3Fla-	https://www.youtube.com/embed/gQ7yaQhXJAI	2007	californication	7	2019-11-06	2019-11-06
35	Orange Is the New Black	Piper Chapman est incarcérée à Litchfield, une prison de sécurité minimale pour quinze mois car elle a transporté une valise d''argent issue du trafic de drogue, dix ans plus tôt, pour son amante d''alors, Alex Vause. Elle tente de se faire à la vie en prison, entre le clanisme, les réseaux et les fortes personnalités des autres détenues.	https://lubieenserie.fr/wp-content/uploads/2018/07/orange-is-the-new-black-saison-6-2018-avis-netflix.jpg	https://www.youtube.com/embed/lNvocVbXE_Y	2013	orange-is-the-new-black	7	2019-11-06	2019-11-06
37	Shameless	La série suit la famille Gallagher, stéréotype de la famille catholique d''origine irlandaise. Le père, Frank Gallagher, est un homme irresponsable qui passe son temps à boire et à tenter de profiter du système. Sa femme a abandonné sa famille en laissant leurs six enfants à leur père qui sont donc livrés à eux-mêmes. Ils apprennent à se débrouiller et à subvenir à leurs besoins ensemble sous l''autorité de Fiona, l’aînée, qui apprend les difficultés de diriger une maison. Les autres enfants sont deux adolescents, Lip et Ian, deux plus jeunes, Carl et Debbie et un bébé, Liam. Fiona est aidée par ses voisins et amis Veronica et Kev. Ce dernier est barman dans le bar préféré de Frank.\n\nLa série aborde avec un certain humour des sujets sérieux comme l’alcoolisme, la drogue, l''homosexualité, le genre, la délinquance et la vie des classes populaires américaines, et se déroule dans le quartier industriel et résidentiel Back of the Yards, du secteur communautaire New City de Chicago.	https://images-na.ssl-images-amazon.com/images/I/81cI053wenL._RI_.jpg	https://www.youtube.com/embed/31vEsCzKJf4	2011	shameless	7	2019-11-06	2019-11-06
36	Hero Corp	À la suite d’une guerre dans les années 1980, il est décidé de créer l’agence Hero Corp, une organisation regroupant tous les super-héros afin de maintenir un climat de paix. Cette agence possède plusieurs sites secrets sur la planète et dans le département de la Lozère se trouvent les retraités, mis au rancart, démissionnaires, démasqués, pas-formés. Coupés du monde, ils peuvent retrouver une vie calme et paisible. Vingt ans après, ce calme paisible vole en éclats lorsque réapparaît The Lord.\n\nFace au retour de The Lord, le plus grand super-vilain de l’Histoire, le village est démuni. Selon une prédiction, John est l''unique solution face à ce danger que Hero Corp préfère garder sous silence.\n\nJohn arrive dans un village isolé pour aller enterrer sa tante. Il se rend compte que les habitants cachent quelque chose et qu’ils n’ont pas l’air décidés à le laisser partir.	https://resize.programme-television.ladmedia.fr/r/670,670/img/var/premiere/storage/images/tele-7-jours/news-tv/hero-corp-france-4-appel-au-financement-des-fans-pour-la-derniere-saison-4233491/76770917-1-fre-FR/Hero-Corp-France-4-appel-au-financement-des-fans-pour-la-derniere-saison.jpg	https://www.youtube.com/embed/wHPcdcffHY8	2008	hero-corp	6	2019-11-06	2019-11-06
40	Lucifer	Lassé et fatigué d''être le « Seigneur des Enfers », Lucifer Morningstar abandonne son royaume et s''en va à Los Angeles où il est propriétaire d''une boîte de nuit appelée « Lux ». Lucifer a reçu le don de contraindre les gens à révéler leurs désirs les plus profonds. Un soir, Lucifer assiste au meurtre d''une chanteuse pop devant son club. Il décide donc d''aller à la recherche du coupable et croise sur son chemin une policière nommée Chloe Decker qui résiste à son don et lui met des bâtons dans les roues.\n\nPendant que Lucifer Morningstar et Chloe Decker font équipe pour trouver le meurtrier, Dieu envoie l''ange Amenadiel sur Terre pour convaincre Lucifer de régner à nouveau sur l''Enfer.	http://www.screentune.com/wp-content/uploads/2018/09/lucifer-se03-L-EN_1920x1080.png	https://www.youtube.com/embed/EpTdZqNgp14	2016	lucifer	7	2019-11-06	2019-11-06
38	Mr. Robot	Elliot Alderson est un jeune informaticien vivant à New York, qui travaille en tant que technicien en sécurité informatique pour Allsafe Security. Celui-ci luttant constamment contre un trouble dissociatif de l''identité et de dépression, son processus de pensée semble fortement influencé par la paranoïa et l''illusion10. Il pirate les comptes des gens, ce qui le conduit souvent à agir comme un cyber-justicier. Elliot rencontre « Mr. Robot », un mystérieux anarchiste qui souhaite le recruter dans son groupe de hackers connu sous le nom de « Fsociety ». Leur objectif consiste à rétablir l''équilibre de la société par la destruction des infrastructures des plus grosses banques et entreprises du monde, notamment le conglomérat E Corp. (surnommé « Evil Corp. » par Elliot) qui, comme client, par ailleurs, représente 80 % du chiffre d’affaires d’Allsafe Security.	https://laregledujeu.org/files/2016/12/mr-robot.jpg	https://www.youtube.com/embed/uml6bz9ygxA	2015	mr-robot	8	2019-11-06	2019-11-06
42	Bleach	Le récit commence en 2001 au Japon dans la ville fictive de Karakura. Ichigo Kurosaki, lycéen de 15 ans, arrive à voir, entendre et toucher les âmes des morts depuis qu''il est tout petit. Un soir, sa routine quotidienne vient à être bouleversée à la suite de sa rencontre avec une shinigami (死神?, littéralement « dieu de la mort »), Rukia Kuchiki, et la venue d''un monstre appelé hollow. Ce dernier étant venu dévorer les âmes de sa famille et la shinigami venue le protéger ayant été blessée par sa faute, Ichigo accepte de devenir lui-même un shinigami afin de les sauver.\n\nCependant, le transfert de pouvoir, censé être temporaire et partiel, est complet et ne s''achève pas. Ichigo est forcé de prendre la responsabilité de la tâche incombant à Rukia Kuchiki. Il commence donc la chasse aux hollows tout en protégeant les âmes humaines.\n\nLe début est centré sur une chasse aux mauvais esprits relativement peu puissants, avec un simple sabre. L''histoire va peu à peu se diriger vers un vaste complot mystico-politique après l''apparition des premiers autres shinigami. Les batailles au sabre du commencement vont alors se métamorphoser en combats dantesques avec des armes aux pouvoirs surprenants et variés, et parfois aux proportions gigantesques.	http://img.over-blog-kiwi.com/0/23/82/39/201307/ob_02529a3eee9fbb1de42fffbf9f7131c7_bleach.jpg	https://www.youtube.com/embed/oZ67d9XSjFs	2004	bleach	9	2019-11-07	2019-11-07
43	Assassination Classroom	L''histoire se déroule au prestigieux collège Kunugigaoka. Koro-sensei est une étrange créature qui déclare avoir subitement détruit 70 % de la Lune. Il prévoit ensuite de détruire la Terre en mars prochain pour des raisons inconnues. Il se présente ensuite au gouvernement japonais et annonce vouloir devenir le professeur principal de la classe 3-E du collège Kunugigaoka pour pouvoir les former en tant qu''assassins et éliminer une cible bien particulière : lui-même, leur propre enseignant.\n\nLes élèves de cette classe auront donc pour objectif d''assassiner leur professeur afin de sauver la Terre, la récompense étant de 10 milliards de yens. Cependant un problème se pose : Koro-sensei se déplace à Mach 20, possède des tentacules à fonctions infinies et, de plus, c''est un excellent professeur ! Le gouvernement va accepter pour pouvoir le garder à l’œil à condition que Koro-sensei ne fasse pas de mal aux élèves2 ; mais les élèves réussiront-ils leur mission avant la date impartie ?	http://maroonersrock.com/wp-content/uploads/2016/06/assassination-classroom-1620x800.jpg	https://www.youtube.com/embed/ZjFB8SDeLGQ	2012	assassination-classroom	9	2019-11-07	2019-11-07
44	Outlander	En 1945, une infirmière de guerre, Claire Randall, mariée à un descendant de capitaine des Dragons, Frank Randall, se retrouve transportée dans l''Écosse révoltée de 1743. Là-bas, elle va être immédiatement confrontée à un monde d''aventures qui lui est inconnu. Elle y rencontre l''ancêtre de son mari, le capitaine Jack Randall, la rébellion et l''un de ses protagonistes, un guerrier des Highlands, Jamie Fraser, ce qui la laissera partagée entre deux mondes et deux hommes que tout oppose7…	https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/hbz-outlander-1-1567006773.jpg	https://www.youtube.com/embed/8IzIX4tjG9c	2014	outlander	10	2019-11-07	2019-11-07
45	Love, Death and Robots	Créatures terrifiantes, méchantes surprises et comédie noire convergent dans cette anthologie d''animation présentée par Tim Miller et David Fincher.	http://www.premiere.fr/sites/default/files/styles/scale_crop_1280x720/public/2019-03/1740696.jpg-r_1920_1080-f_jpg-q_x-xxyxx.jpg	https://www.youtube.com/embed/7kQsA-jAJck	2019	love-death-and-robots	10	2019-11-07	2019-11-07
46	La Guerre des mondes	Le docteur Catherine Durand est une astrophysicienne à l''Institut de radioastronomie millimétrique de Grenoble lorsqu''elle parvient à recevoir une transmission de données émanant d''extraterrestres situés dans une autre galaxie. Quelques jours après qu''elle a révélé cette information au monde entier, la population est anéantie. Seule une poignée de personnes s''en est sortie et essaye tant bien que mal de survivre, traquée par des extraterrestres.	https://thumb.canalplus.pro/bddpe/unsafe/1280x720/92949410	https://www.youtube.com/embed/QD0whiJYRU4	2019	la-guerre-des-mondes	11	2019-11-07	2019-11-07
47	See	Dans un monde futuriste ravagé par la quête de pouvoir des Hommes, les êtres humains ont perdu la vue, qui leur aurait été retirée pour « guérir la Terre ». Revenus à l''état primitif, ils constituent leurs tribus et apprennent à survivre sans leurs yeux, en surdéveloppant leurs sens restants. Mais un jour, la compagne de Baba Voss, chef de l''une d''elles, met au monde des jumeaux pourvus d''une vision parfaite. S''en suit alors une terrible guerre qui oppose la tribu de Baba Voss à celle de Queen Kane, persuadée que ces enfants causeront leur perte…	https://static.cnews.fr/sites/default/files/apple_tv_see_key_art_16_9_5dbaed984cfd0_0.jpg	https://www.youtube.com/embed/7Rg0y7NT1gU	2019	see	11	2019-11-07	2019-11-07
48	Hunter X Hunter	Gon Freecss a douze ans, et rêve de devenir hunter (chasseur en anglais). Les hunters sont des aventuriers d''élite qui peuvent être chasseurs de prime, chefs-cuisinier, archéologues, zoologues, justiciers ou consultants dans divers domaines. Son père, Ging Freecss, qu''il ne connaît pas directement, est considéré comme un des plus grands hunters de son temps. C''est aussi pour le retrouver que Gon veut devenir hunter.\n\nCependant l''examen de hunter, qui a lieu chaque année, est extrêmement difficile et périlleux. On dit qu''un candidat sur 10 000 arrive sur le lieu des épreuves et qu''un seul candidat tous les trois ans devient hunter à sa première tentative. Durant les épreuves, il n''est pas rare d''être blessé, voire tué par des monstres, des pièges ou même d''autres concurrents…\n\nAu cours de cet examen, Gon va rencontrer différents personnages, aussi bien amis qu''ennemis : Kurapika, dont le seul objectif est de venger son clan, le clan Kuruta, assassiné par la Brigade fantôme et tenter de récupérer les yeux de son clan, les pupilles écarlates ; Léolio, dont le but avoué est d''acquérir de l''argent pour financer ses études de médecine ; Kirua, qui a le même âge que Gon, fils d''une famille d''assassin d''élite, la famille Zoldik, ne souhaitant pas poursuivre la voie de sa famille, qui participe à cet examen par simple amour du défi ; Hisoka, dont la grande passion est le combat contre des guerriers très puissants ; ainsi que beaucoup d''autres…\n\nLa force de Gon n''est pas que physique : son charisme, sa pureté, sa gentillesse, sa grande générosité et surtout son incroyable capacité à attirer la sympathie l''aident souvent à sortir des situations les plus périlleuses	http://ekladata.com/dGWw0OiLC4456wtbFGaKwdPOzxE.png	https://www.youtube.com/embed/XrdbZT5luns	1999	hunter-x-hunter	9	2019-11-07	2019-11-07
49	Daredevil	Aveugle depuis ses neuf ans à la suite d''un accident, Matt Murdock possède des sens qui bénéficient d''une acuité extraordinaire. Avocat le jour, il devient le super-héros Daredevil lorsque la nuit tombe, afin de lutter contre l’injustice à New York, plus particulièrement dans le quartier de Hell''s Kitchen, corrompu par la criminalité depuis sa reconstruction après l''attaque des Chitauris lors des événements du film Avengers.	https://www.fanactu.com/medias/netflix-annule-daredevil-apres-trois-saisons_11024/netflix-annule-daredevil-apres-trois-saisons-cover-desktop-181888.jpg	https://www.youtube.com/embed/mGEWftxFX3M	2015	daredevil	10	2019-11-07	2019-11-07
39	The End of the F***ing World	James, âgé de dix-sept ans et qui vit seul avec son père veuf, se présente comme un psychopathe et tue régulièrement des animaux comme passe-temps. Il se lie avec Alyssa, une camarade de lycée aussi rêveuse que rebelle qui vit avec sa mère et son beau-père. James, en quête de quelque chose de plus gros qu''un animal à tuer, se donne pour but de l''assassiner. Mais James commence à ressentir des sentiments pour elle, alors qu''ils fuguent chacun de chez eux et se lancent dans un road trip, où ils feront face à de nombreuses péripéties tragi-comiques…	https://images-na.ssl-images-amazon.com/images/I/81QWWN7IjIL._SL1500_.jpg	https://www.youtube.com/embed/iwvpyzTvycE	2017	the-end-of-the-fing-world	7	2019-11-06	2019-11-06
\.


--
-- Data for Name: shows_have_actors; Type: TABLE DATA; Schema: public; Owner: serialkiller
--

COPY public.shows_have_actors (shows_id, actors_id, "createdAt", "updatedAt") FROM stdin;
9	4	2019-10-27	2019-10-27
12	6	2019-11-06	2019-11-06
12	7	2019-11-06	2019-11-06
12	8	2019-11-06	2019-11-06
12	9	2019-11-06	2019-11-06
19	10	2019-11-06	2019-11-06
20	11	2019-11-06	2019-11-06
20	12	2019-11-06	2019-11-06
20	13	2019-11-06	2019-11-06
21	14	2019-11-06	2019-11-06
21	15	2019-11-06	2019-11-06
21	16	2019-11-06	2019-11-06
21	17	2019-11-06	2019-11-06
22	18	2019-11-06	2019-11-06
22	19	2019-11-06	2019-11-06
22	20	2019-11-06	2019-11-06
22	21	2019-11-06	2019-11-06
22	22	2019-11-06	2019-11-06
22	23	2019-11-06	2019-11-06
22	24	2019-11-06	2019-11-06
22	25	2019-11-06	2019-11-06
22	26	2019-11-06	2019-11-06
23	27	2019-11-06	2019-11-06
23	28	2019-11-06	2019-11-06
23	29	2019-11-06	2019-11-06
23	30	2019-11-06	2019-11-06
23	31	2019-11-06	2019-11-06
23	32	2019-11-06	2019-11-06
23	33	2019-11-06	2019-11-06
23	34	2019-11-06	2019-11-06
24	35	2019-11-06	2019-11-06
24	36	2019-11-06	2019-11-06
24	37	2019-11-06	2019-11-06
24	38	2019-11-06	2019-11-06
25	39	2019-11-06	2019-11-06
25	40	2019-11-06	2019-11-06
25	41	2019-11-06	2019-11-06
25	42	2019-11-06	2019-11-06
25	43	2019-11-06	2019-11-06
26	44	2019-11-06	2019-11-06
26	45	2019-11-06	2019-11-06
26	46	2019-11-06	2019-11-06
26	47	2019-11-06	2019-11-06
26	49	2019-11-06	2019-11-06
26	50	2019-11-06	2019-11-06
31	51	2019-11-06	2019-11-06
31	52	2019-11-06	2019-11-06
31	53	2019-11-06	2019-11-06
31	54	2019-11-06	2019-11-06
31	55	2019-11-06	2019-11-06
31	56	2019-11-06	2019-11-06
32	57	2019-11-06	2019-11-06
32	58	2019-11-06	2019-11-06
32	59	2019-11-06	2019-11-06
32	60	2019-11-06	2019-11-06
32	61	2019-11-06	2019-11-06
32	62	2019-11-06	2019-11-06
33	63	2019-11-06	2019-11-06
33	64	2019-11-06	2019-11-06
33	65	2019-11-06	2019-11-06
33	66	2019-11-06	2019-11-06
33	67	2019-11-06	2019-11-06
33	68	2019-11-06	2019-11-06
34	69	2019-11-06	2019-11-06
34	70	2019-11-06	2019-11-06
34	71	2019-11-06	2019-11-06
34	72	2019-11-06	2019-11-06
34	73	2019-11-06	2019-11-06
35	74	2019-11-06	2019-11-06
35	75	2019-11-06	2019-11-06
35	76	2019-11-06	2019-11-06
35	77	2019-11-06	2019-11-06
35	78	2019-11-06	2019-11-06
35	79	2019-11-06	2019-11-06
35	80	2019-11-06	2019-11-06
36	81	2019-11-06	2019-11-06
36	82	2019-11-06	2019-11-06
36	83	2019-11-06	2019-11-06
36	84	2019-11-06	2019-11-06
36	85	2019-11-06	2019-11-06
36	86	2019-11-06	2019-11-06
37	87	2019-11-06	2019-11-06
37	88	2019-11-06	2019-11-06
37	89	2019-11-06	2019-11-06
37	90	2019-11-06	2019-11-06
37	91	2019-11-06	2019-11-06
37	92	2019-11-06	2019-11-06
37	93	2019-11-06	2019-11-06
37	94	2019-11-06	2019-11-06
37	95	2019-11-06	2019-11-06
38	96	2019-11-06	2019-11-06
38	97	2019-11-06	2019-11-06
38	98	2019-11-06	2019-11-06
38	99	2019-11-06	2019-11-06
38	100	2019-11-06	2019-11-06
39	101	2019-11-06	2019-11-06
39	102	2019-11-06	2019-11-06
40	103	2019-11-06	2019-11-06
40	104	2019-11-06	2019-11-06
40	105	2019-11-06	2019-11-06
40	106	2019-11-06	2019-11-06
40	107	2019-11-06	2019-11-06
40	108	2019-11-06	2019-11-06
41	109	2019-11-06	2019-11-06
41	110	2019-11-06	2019-11-06
41	111	2019-11-06	2019-11-06
41	112	2019-11-06	2019-11-06
41	113	2019-11-06	2019-11-06
41	114	2019-11-06	2019-11-06
44	115	2019-11-07	2019-11-07
44	116	2019-11-07	2019-11-07
44	117	2019-11-07	2019-11-07
45	118	2019-11-07	2019-11-07
45	119	2019-11-07	2019-11-07
45	120	2019-11-07	2019-11-07
45	121	2019-11-07	2019-11-07
45	122	2019-11-07	2019-11-07
46	123	2019-11-07	2019-11-07
46	124	2019-11-07	2019-11-07
46	125	2019-11-07	2019-11-07
49	126	2019-11-07	2019-11-07
49	127	2019-11-07	2019-11-07
49	128	2019-11-07	2019-11-07
49	129	2019-11-07	2019-11-07
49	130	2019-11-07	2019-11-07
49	131	2019-11-07	2019-11-07
9	132	2019-10-27	2019-10-27
\.


--
-- Data for Name: shows_have_directors; Type: TABLE DATA; Schema: public; Owner: serialkiller
--

COPY public.shows_have_directors (shows_id, directors_id, "createdAt", "updatedAt") FROM stdin;
9	6	2019-10-27	2019-10-27
9	7	2019-10-28	2019-10-28
12	8	2019-10-28	2019-10-28
12	9	2019-10-28	2019-10-28
12	10	2019-10-28	2019-10-28
19	11	2019-11-06	2019-11-06
20	13	2019-11-06	2019-11-06
21	14	2019-11-06	2019-11-06
22	15	2019-11-06	2019-11-06
23	16	2019-11-06	2019-11-06
23	17	2019-11-06	2019-11-06
24	18	2019-11-06	2019-11-06
25	19	2019-11-06	2019-11-06
26	20	2019-11-06	2019-11-06
27	21	2019-11-06	2019-11-06
28	22	2019-11-06	2019-11-06
29	23	2019-11-06	2019-11-06
30	24	2019-11-06	2019-11-06
30	25	2019-11-06	2019-11-06
31	26	2019-11-06	2019-11-06
31	27	2019-11-06	2019-11-06
32	28	2019-11-06	2019-11-06
32	29	2019-11-06	2019-11-06
32	30	2019-11-06	2019-11-06
33	31	2019-11-06	2019-11-06
33	32	2019-11-06	2019-11-06
34	33	2019-11-06	2019-11-06
35	34	2019-11-06	2019-11-06
36	35	2019-11-06	2019-11-06
36	36	2019-11-06	2019-11-06
37	37	2019-11-06	2019-11-06
38	38	2019-11-06	2019-11-06
39	39	2019-11-06	2019-11-06
40	40	2019-11-06	2019-11-06
41	41	2019-11-06	2019-11-06
41	42	2019-11-06	2019-11-06
42	43	2019-11-07	2019-11-07
43	44	2019-11-07	2019-11-07
44	45	2019-11-07	2019-11-07
45	46	2019-11-07	2019-11-07
45	47	2019-11-07	2019-11-07
45	48	2019-11-07	2019-11-07
45	49	2019-11-07	2019-11-07
46	50	2019-11-07	2019-11-07
47	14	2019-11-07	2019-11-07
47	51	2019-11-07	2019-11-07
48	52	2019-11-07	2019-11-07
49	53	2019-11-07	2019-11-07
\.


--
-- Name: shows_id_seq; Type: SEQUENCE SET; Schema: public; Owner: serialkiller
--

SELECT pg_catalog.setval('public.shows_id_seq', 50, true);


--
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: serialkiller
--

COPY public.users (id, firstname, lastname, handle, email, password, slug, picture, banner, "createdAt", "updatedAt") FROM stdin;
45	Claude	jean	JeanClaudeDu02	Jean.claude@gmail.com	$2b$10$GnNUkXwWwwLBV9q5f31JrOwOzuxC2u7hVZHfGxgRyJeMi9qUY2Yha	jeanclaudedu02	https://vignette.wikia.nocookie.net/villains/images/a/a3/Promopopups_SK.png/revision/latest?cb=20181225031001	https://i0.wp.com/leserigraphe.com/wp-content/uploads/2015/07/GoT.jpeg?fit=2560%2C1600	2019-12-09	2019-12-09
46	Abeba	Abeba	Abeba	abeba@abeba.com	$2b$10$74fVBHOSn/kl2ZXMb1nbM.InIDKwW8hjae57NeMqVWK.yFHyWyMcm	abeba	https://vignette.wikia.nocookie.net/villains/images/a/a3/Promopopups_SK.png/revision/latest?cb=20181225031001	https://i0.wp.com/leserigraphe.com/wp-content/uploads/2015/07/GoT.jpeg?fit=2560%2C1600	2019-12-13	2019-12-13
47	Ngwe	Ngwe	Ngwe	ngwe@ngwe.com	$2b$10$UbAgJtkDnnHtvmMkP0LLVevAGG12u9GhxMQQ1wyPOTVaKJFDsgG46	ngwe	https://vignette.wikia.nocookie.net/villains/images/a/a3/Promopopups_SK.png/revision/latest?cb=20181225031001	https://i0.wp.com/leserigraphe.com/wp-content/uploads/2015/07/GoT.jpeg?fit=2560%2C1600	2019-12-13	2019-12-13
50	cherie	cherie	cherie	cherie@cherie.com	$2b$10$1zB26BIpBhnn6JpANU/sKuNMROgE0gIhkhsBYPG4E/eW9v1IC9PMu	cherie	https://vignette.wikia.nocookie.net/villains/images/a/a3/Promopopups_SK.png/revision/latest?cb=20181225031001	https://i0.wp.com/leserigraphe.com/wp-content/uploads/2015/07/GoT.jpeg?fit=2560%2C1600	2019-12-18	2019-12-18
37	Carine	Lingoli	Rinou	carine@carine.com	$2b$10$BkbtsEdmJEK7llCxZO0.HuF6xtTbNfXRqSYeivEBOo2krkZoMaO1C	rinou	https://vignette.wikia.nocookie.net/villains/images/a/a3/Promopopups_SK.png/revision/latest?cb=20181225031001	https://www.cjoint.com/doc/19_11/IKgxacWjxuA_handmaidstale.v1.jpg	2019-11-06	2019-11-06
38	pierre	pierre	pierre	pierre@pierre.com	$2b$10$V6JUgAbQRtZ6MLd94IFI8esgBd8s1Rav78De.DZp8e0jWY9Xsi6eS	pierre	https://vignette.wikia.nocookie.net/villains/images/a/a3/Promopopups_SK.png/revision/latest?cb=20181225031001	https://www.cjoint.com/doc/19_11/IKgxhWWkU8A_htgawm-etbug.v1.jpg	2019-11-06	2019-11-06
27	paul	paul	paul	paul@paul.com	$2b$10$8ThNetmyCqTa99D/x9qs6.6SGBn2ufVUL0bs2uEB.GxMqZvMUiOii	paul	https://vignette.wikia.nocookie.net/villains/images/a/a3/Promopopups_SK.png/revision/latest?cb=20181225031001	https://img.thedailybeast.com/image/upload/c_crop,d_placeholder_euli9k,h_1440,w_2560,x_0,y_0/dpr_1.5/c_limit,w_1044/fl_lossy,q_auto/v1533095559/180801-wilstein-better-call-saul-hero_zc97f2	2019-11-04	2019-11-04
20	Lou	Lou	Lou	lou@lou.com	$2b$10$InVv2Lzw9TFC3ZMGJUwdbuBdQr.60R0gVjkSkOZOOXfgzwHnZdOUu	lou	https://vignette.wikia.nocookie.net/villains/images/a/a3/Promopopups_SK.png/revision/latest?cb=20181225031001	https://www.pbs.org/wgbh/masterpiece/wp-content/uploads/2016/12/sherlock_S4_preview_poster.jpg	2019-10-30	2019-10-30
41	Mathieu	Maniga	Mathieu 	mathieu.maniga@gmail.com	$2b$10$HR8C1ZMLFinRjuS5WSN2Ae3EPcwpkLPulIyI2GSM03kj1iEw787P.	mathieu	https://vignette.wikia.nocookie.net/villains/images/a/a3/Promopopups_SK.png/revision/latest?cb=20181225031001	https://i0.wp.com/leserigraphe.com/wp-content/uploads/2015/07/GoT.jpeg?fit=2560%2C1600	2019-11-07	2019-11-07
44	Franck	Rudloff	Lagirole	rfpr@orange.fr	$2b$10$8mjfRLCQtvbsLPhdHGWT6OWh6z9BS6HOI3anhl8ouaARwq/x3L2dS	lagirole	https://vignette.wikia.nocookie.net/villains/images/a/a3/Promopopups_SK.png/revision/latest?cb=20181225031001	https://i0.wp.com/leserigraphe.com/wp-content/uploads/2015/07/GoT.jpeg?fit=2560%2C1600	2019-11-09	2019-11-09
43	Bénita	IBOMABEKA	Benilicious	benitaibomabeka@yahoo.fr	$2b$10$BgLdc7FKsOyvL3a03I4RveS/56V/Ze9MdtwjcloqvWMm2Nd6KlhaS	benilicous	https://vignette.wikia.nocookie.net/villains/images/a/a3/Promopopups_SK.png/revision/latest?cb=20181225031001	https://i0.wp.com/leserigraphe.com/wp-content/uploads/2015/07/GoT.jpeg?fit=2560%2C1600	2019-11-08	2019-11-08
17	lulu	nouille	lulu	lulu@nouille.com	$2b$10$IR6Y2m5RrdZJlV0NvrnSqOir41yop.zZPked4TJn2Ow8Kr6eW5hye	lulu	https://vignette.wikia.nocookie.net/villains/images/a/a3/Promopopups_SK.png/revision/latest?cb=20181225031001	https://wwwimage-secure.cbsstatic.com/thumbnails/photos/w1920/marquee/11/62/51/4/hero_landscape_1e26aa17-a679-41b5-8638-080a14161f75.jpg	2019-10-29	2019-10-29
19	Justine	Bdg	Juju	justine@ju.com	$2b$10$rRESLF55aH4BrkZrzKufyeIkEMUBeTYwY23jE64NVCOCzu7PIHzNu	juju	https://www.cjoint.com/doc/20_01/JAcrOYxjBmA_justine.jpeg	https://img.chefdentreprise.com/Img/BREVE/2019/4/339304/Game-Thrones-quelle-entrepreneure-serait-Daenerys-Targaryen--F.jpg	2019-10-29	2019-10-29
15	Johan	Lemaire	Johan	johan@johan.com	$2b$10$sbJ787QbsA9vtsnmb1Y.PuDqnmnY//.dRjXcpUDyKoAoibCw.KKtC	johan	https://www.cjoint.com/doc/20_01/JAcrM3bTsTA_johan.jpeg	https://i.pinimg.com/originals/c8/a3/51/c8a351c6801c380c9bb6ec40bf870fd1.jpg	2019-10-28	2019-10-28
18	Peter	Rudloff	Peter	peter.rudloff@protonmail.com	$2b$10$uaJmxnzC4cr5WLBP9EZ..ugiLoZuuS4zuKbSy8HgU7zIOytCf0spq	peter	https://www.cjoint.com/doc/20_01/JAds4Ie664A_peter.jpeg	https://i0.wp.com/leserigraphe.com/wp-content/uploads/2015/07/GoT.jpeg?fit=2560%2C1600	2019-10-29	2019-10-29
1	Marc	Miano	Marco	marc@miano.com	$2b$10$nwXFhQ1BfC.2/YdiYfVgkO1NoqGEZf8EUjOjSJlhWNFCV0Xb5tHCu	marco	https://vignette.wikia.nocookie.net/villains/images/a/a3/Promopopups_SK.png/revision/latest?cb=20181225031001	https://www.telegraph.co.uk/content/dam/on-demand/2017/09/15/sanjunipero2_trans%2B%2BaxhR1vC4M3eHXTZuhDlJpzlaTMTxUhlzF8Rkw038U-A.png	2019-10-24	2019-10-24
16	Abeba	Ngwe	Abi	abi@abi.com	$2b$10$ZwwXLH3JN7wfECUOgyjW8O42h4xXtw/uhdWg2KHJ42uUEY..SYSse	abi	https://www.cjoint.com/doc/19_11/IKgxpN8tTiA_abibibi.jpg	https://i0.wp.com/leserigraphe.com/wp-content/uploads/2015/07/GoT.jpeg?fit=2560%2C1600	2019-10-29	2019-10-29
\.


--
-- Name: users_id_seq; Type: SEQUENCE SET; Schema: public; Owner: serialkiller
--

SELECT pg_catalog.setval('public.users_id_seq', 54, true);


--
-- Name: actors_pkey; Type: CONSTRAINT; Schema: public; Owner: serialkiller
--

ALTER TABLE ONLY public.actors
    ADD CONSTRAINT actors_pkey PRIMARY KEY (id);


--
-- Name: chatmessages_pkey; Type: CONSTRAINT; Schema: public; Owner: serialkiller
--

ALTER TABLE ONLY public.chatmessages
    ADD CONSTRAINT chatmessages_pkey PRIMARY KEY (id);


--
-- Name: directors_pkey; Type: CONSTRAINT; Schema: public; Owner: serialkiller
--

ALTER TABLE ONLY public.directors
    ADD CONSTRAINT directors_pkey PRIMARY KEY (id);


--
-- Name: genres_pkey; Type: CONSTRAINT; Schema: public; Owner: serialkiller
--

ALTER TABLE ONLY public.genres
    ADD CONSTRAINT genres_pkey PRIMARY KEY (id);


--
-- Name: relationships_pkey; Type: CONSTRAINT; Schema: public; Owner: serialkiller
--

ALTER TABLE ONLY public.relationships
    ADD CONSTRAINT relationships_pkey PRIMARY KEY (id);


--
-- Name: reviews_pkey; Type: CONSTRAINT; Schema: public; Owner: serialkiller
--

ALTER TABLE ONLY public.reviews
    ADD CONSTRAINT reviews_pkey PRIMARY KEY (id);


--
-- Name: shows_have_actors_pkey; Type: CONSTRAINT; Schema: public; Owner: serialkiller
--

ALTER TABLE ONLY public.shows_have_actors
    ADD CONSTRAINT shows_have_actors_pkey PRIMARY KEY (shows_id, actors_id);


--
-- Name: shows_have_directors_pkey; Type: CONSTRAINT; Schema: public; Owner: serialkiller
--

ALTER TABLE ONLY public.shows_have_directors
    ADD CONSTRAINT shows_have_directors_pkey PRIMARY KEY (shows_id, directors_id);


--
-- Name: shows_pkey; Type: CONSTRAINT; Schema: public; Owner: serialkiller
--

ALTER TABLE ONLY public.shows
    ADD CONSTRAINT shows_pkey PRIMARY KEY (id);


--
-- Name: users_pkey; Type: CONSTRAINT; Schema: public; Owner: serialkiller
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);


--
-- Name: actors_id; Type: FK CONSTRAINT; Schema: public; Owner: serialkiller
--

ALTER TABLE ONLY public.shows_have_actors
    ADD CONSTRAINT actors_id FOREIGN KEY (actors_id) REFERENCES public.actors(id) NOT VALID;


--
-- Name: chatmessages_users_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: serialkiller
--

ALTER TABLE ONLY public.chatmessages
    ADD CONSTRAINT chatmessages_users_id_fkey FOREIGN KEY (users_id) REFERENCES public.users(id) NOT VALID;


--
-- Name: directors_id; Type: FK CONSTRAINT; Schema: public; Owner: serialkiller
--

ALTER TABLE ONLY public.shows_have_directors
    ADD CONSTRAINT directors_id FOREIGN KEY (directors_id) REFERENCES public.directors(id) NOT VALID;


--
-- Name: genres_id; Type: FK CONSTRAINT; Schema: public; Owner: serialkiller
--

ALTER TABLE ONLY public.shows
    ADD CONSTRAINT genres_id FOREIGN KEY (genres_id) REFERENCES public.genres(id) NOT VALID;


--
-- Name: shows_id; Type: FK CONSTRAINT; Schema: public; Owner: serialkiller
--

ALTER TABLE ONLY public.reviews
    ADD CONSTRAINT shows_id FOREIGN KEY (shows_id) REFERENCES public.shows(id) NOT VALID;


--
-- Name: shows_id; Type: FK CONSTRAINT; Schema: public; Owner: serialkiller
--

ALTER TABLE ONLY public.shows_have_directors
    ADD CONSTRAINT shows_id FOREIGN KEY (shows_id) REFERENCES public.shows(id) NOT VALID;


--
-- Name: shows_id; Type: FK CONSTRAINT; Schema: public; Owner: serialkiller
--

ALTER TABLE ONLY public.shows_have_actors
    ADD CONSTRAINT shows_id FOREIGN KEY (shows_id) REFERENCES public.shows(id) NOT VALID;


--
-- Name: users_id; Type: FK CONSTRAINT; Schema: public; Owner: serialkiller
--

ALTER TABLE ONLY public.reviews
    ADD CONSTRAINT users_id FOREIGN KEY (users_id) REFERENCES public.users(id) NOT VALID;


--
-- Name: SCHEMA public; Type: ACL; Schema: -; Owner: postgres
--

REVOKE ALL ON SCHEMA public FROM PUBLIC;
REVOKE ALL ON SCHEMA public FROM postgres;
GRANT ALL ON SCHEMA public TO postgres;
GRANT ALL ON SCHEMA public TO PUBLIC;


--
-- PostgreSQL database dump complete
--

