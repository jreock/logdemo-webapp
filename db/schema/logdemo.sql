-- Table: public.logdemo

CREATE SEQUENCE logdemo_key_seq INCREMENT BY 1 MINVALUE 1 NO MAXVALUE;

CREATE TABLE public.logdemo
(
    key integer NOT NULL DEFAULT nextval('logdemo_key_seq'::regclass),
    text text COLLATE pg_catalog."default",
    CONSTRAINT logdemo_pkey PRIMARY KEY (key)
)
WITH (
    OIDS = FALSE
)
TABLESPACE pg_default;

ALTER TABLE public.logdemo
    OWNER to postgres;
