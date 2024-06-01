PGDMP                      |        
   restaurant    16.3    16.3 -    /           0    0    ENCODING    ENCODING        SET client_encoding = 'UTF8';
                      false            0           0    0 
   STDSTRINGS 
   STDSTRINGS     (   SET standard_conforming_strings = 'on';
                      false            1           0    0 
   SEARCHPATH 
   SEARCHPATH     8   SELECT pg_catalog.set_config('search_path', '', false);
                      false            2           1262    16400 
   restaurant    DATABASE     �   CREATE DATABASE restaurant WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE_PROVIDER = libc LOCALE = 'Ukrainian_Ukraine.1251';
    DROP DATABASE restaurant;
                duck    false                        3079    16458 	   uuid-ossp 	   EXTENSION     ?   CREATE EXTENSION IF NOT EXISTS "uuid-ossp" WITH SCHEMA public;
    DROP EXTENSION "uuid-ossp";
                   false            3           0    0    EXTENSION "uuid-ossp"    COMMENT     W   COMMENT ON EXTENSION "uuid-ossp" IS 'generate universally unique identifiers (UUIDs)';
                        false    2            �            1255    16469    booking_booking_id_function()    FUNCTION     �   CREATE FUNCTION public.booking_booking_id_function() RETURNS trigger
    LANGUAGE plpgsql
    AS $$
		BEGIN
			New.booking_id:=nextval('booking_booking_id_seq');
			Return NEW;
		END;
	$$;
 4   DROP FUNCTION public.booking_booking_id_function();
       public          postgres    false            �            1255    16470    menu_menu_id_function()    FUNCTION     �   CREATE FUNCTION public.menu_menu_id_function() RETURNS trigger
    LANGUAGE plpgsql
    AS $$
		BEGIN
			New.menu_id:=nextval('menu_menu_id_seq');
			Return NEW;
		END;
	$$;
 .   DROP FUNCTION public.menu_menu_id_function();
       public          postgres    false            �            1255    16471 "   menu_section_section_id_function()    FUNCTION     �   CREATE FUNCTION public.menu_section_section_id_function() RETURNS trigger
    LANGUAGE plpgsql
    AS $$
		BEGIN
			New.section_id:=nextval('menu_section_section_id_seq');
			Return NEW;
		END;
	$$;
 9   DROP FUNCTION public.menu_section_section_id_function();
       public          postgres    false            �            1255    16472 &   types_of_cuisine_cuisine_id_function()    FUNCTION     �   CREATE FUNCTION public.types_of_cuisine_cuisine_id_function() RETURNS trigger
    LANGUAGE plpgsql
    AS $$
		BEGIN
			New.cuisine_id:=nextval('types_of_cuisine_cuisine_id_seq');
			Return NEW;
		END;
	$$;
 =   DROP FUNCTION public.types_of_cuisine_cuisine_id_function();
       public          postgres    false            �            1259    16473    menu    TABLE     �   CREATE TABLE public.menu (
    menu_id integer NOT NULL,
    name character varying(255),
    description character varying(255),
    weight character varying(100),
    section_id integer
);
    DROP TABLE public.menu;
       public         heap    duck    false            �            1259    16478    menu_section    TABLE     �   CREATE TABLE public.menu_section (
    section_id integer NOT NULL,
    section_name character varying(255),
    cuisine_id integer
);
     DROP TABLE public.menu_section;
       public         heap    duck    false            �            1259    16481    types_of_cuisine    TABLE     {  CREATE TABLE public.types_of_cuisine (
    cuisine_id integer NOT NULL,
    cuisine_name character varying(255),
    description text,
    first_bg text,
    second_bg text,
    logo character varying,
    image text,
    hours character varying(50),
    image2 text,
    image3 text,
    quote character varying(255),
    telegram text,
    instagram text,
    facebook text
);
 $   DROP TABLE public.types_of_cuisine;
       public         heap    duck    false            �            1259    16486    all_menu    VIEW     p  CREATE VIEW public.all_menu AS
 SELECT m.menu_id,
    m.name,
    m.description,
    m.weight,
    m.section_id,
    ms.section_name,
    ms.cuisine_id,
    tc.cuisine_name
   FROM public.menu m,
    public.types_of_cuisine tc,
    public.menu_section ms
  WHERE ((ms.cuisine_id = tc.cuisine_id) AND (m.section_id = ms.section_id))
  ORDER BY m.menu_id, m.section_id;
    DROP VIEW public.all_menu;
       public          postgres    false    216    218    218    217    217    217    216    216    216    216            �            1259    16490    booking    TABLE     W  CREATE TABLE public.booking (
    booking_id integer NOT NULL,
    client_name character varying(150),
    client_surname character varying(255),
    phone_number character varying(50),
    email character varying(255),
    booking_date date,
    booking_time time(4) without time zone,
    cuisine_id integer,
    number_of_people integer
);
    DROP TABLE public.booking;
       public         heap    duck    false            �            1259    16495    booking_booking_id_seq    SEQUENCE        CREATE SEQUENCE public.booking_booking_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 -   DROP SEQUENCE public.booking_booking_id_seq;
       public          postgres    false            �            1259    16496    complex_information    TABLE     �  CREATE TABLE public.complex_information (
    name character varying(100),
    logo text,
    frst_text text,
    scnd_text text,
    frst_bg text,
    scnd_bg text,
    adress character varying(150),
    contacts text,
    hours character varying,
    id integer NOT NULL,
    frst_quote character varying(255),
    scnd_quote character varying(255),
    telegram text,
    instagram text,
    facebook text,
    image text
);
 '   DROP TABLE public.complex_information;
       public         heap    duck    false            �            1259    16501    menu_menu_id_seq    SEQUENCE     y   CREATE SEQUENCE public.menu_menu_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 '   DROP SEQUENCE public.menu_menu_id_seq;
       public          postgres    false            �            1259    16502    menu_section_section_id_seq    SEQUENCE     �   CREATE SEQUENCE public.menu_section_section_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 2   DROP SEQUENCE public.menu_section_section_id_seq;
       public          postgres    false            �            1259    16503    section_and_cuisines    VIEW     �   CREATE VIEW public.section_and_cuisines AS
 SELECT ms.section_id,
    ms.section_name,
    ms.cuisine_id,
    tc.cuisine_name
   FROM public.types_of_cuisine tc,
    public.menu_section ms
  WHERE (ms.cuisine_id = tc.cuisine_id);
 '   DROP VIEW public.section_and_cuisines;
       public          duck    false    218    217    217    217    218            �            1259    16507    types_of_cuisine_cuisine_id_seq    SEQUENCE     �   CREATE SEQUENCE public.types_of_cuisine_cuisine_id_seq
    START WITH 12
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 6   DROP SEQUENCE public.types_of_cuisine_cuisine_id_seq;
       public          postgres    false            �            1259    16508    users    TABLE     �   CREATE TABLE public.users (
    user_id uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    user_name character varying(255) NOT NULL,
    user_password character varying(255) NOT NULL
);
    DROP TABLE public.users;
       public         heap    duck    false    2            &          0    16490    booking 
   TABLE DATA           �   COPY public.booking (booking_id, client_name, client_surname, phone_number, email, booking_date, booking_time, cuisine_id, number_of_people) FROM stdin;
    public          duck    false    220   �:       (          0    16496    complex_information 
   TABLE DATA           �   COPY public.complex_information (name, logo, frst_text, scnd_text, frst_bg, scnd_bg, adress, contacts, hours, id, frst_quote, scnd_quote, telegram, instagram, facebook, image) FROM stdin;
    public          duck    false    222   �;       #          0    16473    menu 
   TABLE DATA           N   COPY public.menu (menu_id, name, description, weight, section_id) FROM stdin;
    public          duck    false    216   :B       $          0    16478    menu_section 
   TABLE DATA           L   COPY public.menu_section (section_id, section_name, cuisine_id) FROM stdin;
    public          duck    false    217   g       %          0    16481    types_of_cuisine 
   TABLE DATA           �   COPY public.types_of_cuisine (cuisine_id, cuisine_name, description, first_bg, second_bg, logo, image, hours, image2, image3, quote, telegram, instagram, facebook) FROM stdin;
    public          duck    false    218   i       ,          0    16508    users 
   TABLE DATA           B   COPY public.users (user_id, user_name, user_password) FROM stdin;
    public          duck    false    227   ��       4           0    0    booking_booking_id_seq    SEQUENCE SET     E   SELECT pg_catalog.setval('public.booking_booking_id_seq', 11, true);
          public          postgres    false    221            5           0    0    menu_menu_id_seq    SEQUENCE SET     >   SELECT pg_catalog.setval('public.menu_menu_id_seq', 1, true);
          public          postgres    false    223            6           0    0    menu_section_section_id_seq    SEQUENCE SET     J   SELECT pg_catalog.setval('public.menu_section_section_id_seq', 68, true);
          public          postgres    false    224            7           0    0    types_of_cuisine_cuisine_id_seq    SEQUENCE SET     N   SELECT pg_catalog.setval('public.types_of_cuisine_cuisine_id_seq', 13, true);
          public          postgres    false    226            �           2606    16518    booking booking_pkey 
   CONSTRAINT     Z   ALTER TABLE ONLY public.booking
    ADD CONSTRAINT booking_pkey PRIMARY KEY (booking_id);
 >   ALTER TABLE ONLY public.booking DROP CONSTRAINT booking_pkey;
       public            duck    false    220            �           2606    16520 ,   complex_information complex_information_pkey 
   CONSTRAINT     j   ALTER TABLE ONLY public.complex_information
    ADD CONSTRAINT complex_information_pkey PRIMARY KEY (id);
 V   ALTER TABLE ONLY public.complex_information DROP CONSTRAINT complex_information_pkey;
       public            duck    false    222            �           2606    16522    menu menu_pkey 
   CONSTRAINT     Q   ALTER TABLE ONLY public.menu
    ADD CONSTRAINT menu_pkey PRIMARY KEY (menu_id);
 8   ALTER TABLE ONLY public.menu DROP CONSTRAINT menu_pkey;
       public            duck    false    216            �           2606    16524    menu_section menu_section_pkey 
   CONSTRAINT     d   ALTER TABLE ONLY public.menu_section
    ADD CONSTRAINT menu_section_pkey PRIMARY KEY (section_id);
 H   ALTER TABLE ONLY public.menu_section DROP CONSTRAINT menu_section_pkey;
       public            duck    false    217            �           2606    16526 &   types_of_cuisine types_of_cuisine_pkey 
   CONSTRAINT     l   ALTER TABLE ONLY public.types_of_cuisine
    ADD CONSTRAINT types_of_cuisine_pkey PRIMARY KEY (cuisine_id);
 P   ALTER TABLE ONLY public.types_of_cuisine DROP CONSTRAINT types_of_cuisine_pkey;
       public            duck    false    218            �           2606    16528    users users_pkey 
   CONSTRAINT     S   ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (user_id);
 :   ALTER TABLE ONLY public.users DROP CONSTRAINT users_pkey;
       public            duck    false    227            �           2620    16529 "   booking booking_booking_id_trigger    TRIGGER     �   CREATE TRIGGER booking_booking_id_trigger BEFORE INSERT ON public.booking FOR EACH ROW EXECUTE FUNCTION public.booking_booking_id_function();
 ;   DROP TRIGGER booking_booking_id_trigger ON public.booking;
       public          duck    false    220    238            �           2620    16530    menu menu_menu_id_trigger    TRIGGER        CREATE TRIGGER menu_menu_id_trigger BEFORE INSERT ON public.menu FOR EACH ROW EXECUTE FUNCTION public.menu_menu_id_function();
 2   DROP TRIGGER menu_menu_id_trigger ON public.menu;
       public          duck    false    216    239            �           2620    16531 ,   menu_section menu_section_section_id_trigger    TRIGGER     �   CREATE TRIGGER menu_section_section_id_trigger BEFORE INSERT ON public.menu_section FOR EACH ROW EXECUTE FUNCTION public.menu_section_section_id_function();
 E   DROP TRIGGER menu_section_section_id_trigger ON public.menu_section;
       public          duck    false    240    217            �           2620    16532 4   types_of_cuisine types_of_cuisine_cuisine_id_trigger    TRIGGER     �   CREATE TRIGGER types_of_cuisine_cuisine_id_trigger BEFORE INSERT ON public.types_of_cuisine FOR EACH ROW EXECUTE FUNCTION public.types_of_cuisine_cuisine_id_function();
 M   DROP TRIGGER types_of_cuisine_cuisine_id_trigger ON public.types_of_cuisine;
       public          duck    false    218    241            �           2606    16533    booking booking_cuisine_id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.booking
    ADD CONSTRAINT booking_cuisine_id_fkey FOREIGN KEY (cuisine_id) REFERENCES public.types_of_cuisine(cuisine_id) NOT VALID;
 I   ALTER TABLE ONLY public.booking DROP CONSTRAINT booking_cuisine_id_fkey;
       public          duck    false    218    4740    220            �           2606    16538 )   menu_section menu_section_cuisine_id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.menu_section
    ADD CONSTRAINT menu_section_cuisine_id_fkey FOREIGN KEY (cuisine_id) REFERENCES public.types_of_cuisine(cuisine_id) NOT VALID;
 S   ALTER TABLE ONLY public.menu_section DROP CONSTRAINT menu_section_cuisine_id_fkey;
       public          duck    false    4740    217    218            �           2606    16543    menu menu_section_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.menu
    ADD CONSTRAINT menu_section_fkey FOREIGN KEY (section_id) REFERENCES public.menu_section(section_id) NOT VALID;
 @   ALTER TABLE ONLY public.menu DROP CONSTRAINT menu_section_fkey;
       public          duck    false    217    216    4738            &   �   x����j�@���4���l����'�x	�����\P���c�����a���?�`
.�@N?���^�?��#��.,���[X�:6�Cw�x�c<�a4)��n�� !��&�D	����	|�a6��ո2�l�_lR�V�����=�Ve���y9}.g���m�w�L�V;M�DF�4�69�t����4%2:�����ʩ;/[n�k��6��e[kӼ�����q�����v�YP~�u����ո
�      (   N  x��W�N[G�m�bK��U�C�����#��4���@1Q�'�JR�2R�TiԦʯ�_�}�����'�9g��#�߽�;3gΜ߹�V.������ꓝ��ݲ�~u���nack}�fi{s��_�F8t>���>��Pq���o�}�w���Ë��:��������wN4C��1�}�|'8��s��ά��o��.��!v���Յ�:mLp=l�|N�K������E���6�����Na�<i�o�3<ѓ�gE�c_�$��q���W�����!a�Co���6|��C]r䈊6�1�&��wxns�Nh!<sx3�Cp�w��%�r�����1 �\�7T`�y.<���9)�����۫�������7��6w�~\{��p���z~��첰g�F�N�CL��0�Hn�R�Uwmc��'[��|�Y�v�^��i _5ҫ��O�=D�8B4!�.�ݱŬm�X��#G#�q3��f���7L�� �q�Ɣ���S��v��]�,�#�c�����G���KF�A���RgX:F�ɱ��6k��M�mʜ^�dBO`J+�1zX<�F���XM�9bG�;�%����7�2^q�O�Ҿ�s����T�8�Zq�%���]b�|:�����<	��Z���W��&GG���qG϶��P�١A��u�{�9?"0q���Й�P��YcO��o�_-?��8��Ù�t��S8��
a����H��&;#2[C�����n�ѕ	D[fP����gL�{ ;2���.-^�k}�'��R���:|:V$t��,_H=r޴�(K5ʄ}V��raM5}#)�5�Q�{�;��0?	�"fn������g��[�sgO`����RPŻ�T��S��dќK{	���=�ܠH�JU��u0e��f�ٴ��O�
Y�`	LZ�*GQ&!nͮ�
do �c��x�D/�+��{�=/L"}�(��
q�.��+���,r4����������ζ[ђ@��y�/��hF2M��r\�1,�ba�����	��,����;a��L��!<����1wFƱ?ڒ+�<�
L���ި��\�>V�q�h�X�+�F����a������䪃�\W"~�)��߂�HVF?�n�*g�i�OqM���T��`�����&���M%[7i�q�j\�����v`[�$���t3ә�����4}�p	aV�
1̌�W���/���\�m��N�SSS #7��Vp�K&���P6U�+�� �0���4�]�k���۷��s[^���|w���f�����!e���#�*����9�$־��HA㔿V8�ÞEe�p�T)Pq�2{�FC䥧y��r�>��+�N�g��_ϧ<��f���)�D��Sr��(�#��=���fu-%q�K���d%�Z��ߨ_J�hv �yj�\��W�����o���^/<��圓�&��оd�m&'�$T���ʹ��W��/.~���8�ߢ˗��[�1k~�͹�7��F��^��Ů�\q�=�������&��Hx�YJ78�}�9,��B���IT/�����_a2s�"�~T�����Һ�o�T���Վ�T���	+��O�3�}�niff�?���      #      x��][od�q~��A8�P�9sϛ%#v	0� Oy�%$«e@���]q׀��,���.�Ubˁt8�,�Ù!�_p�/藤���9s�6/�aI�������{�$���<��<�'���:�����y2;��忣��f���V�/��8�bP���quv����8��k�50�G �'��쐾@���i��A�旵J����Y%���t���٫�/f'4�#�1�2�G~*�͞�c"�+B2��sBu<��I��N	����c&i��} �ID�����1QrJ���h1�#l;��y9�?����������J���J�з��W} ���12;�Ҥ^��xyd:�J_0�@s�	����K�]���h��?ŞD3�B_��߼P�j�C�i=D����u�L�0��Y�gB𿝝g�3I%�]�=Vq�	-����������S���!�z����ۈ)g$�kgM+��{�OE���%k)�X���� ����2�g��Гj>*�h��F��Aұс�7��I8��q���h�}���>�io�8���N�����p�x� =�=��&���3��Eؠ(֐M�a3^C��rJ�3"�6�0gfcdr�9]��!���-4���%�5��c�RD�M&qH0$e��m��V'��_�X��%wM_���,��H[E��f8b�)Ϙ�GR�|H���s*3�j�8>��ڮ���a�����>1�	Dz��^46u���4悥�`렩�Y�C��`�������q'��!�OӖ���J�'Yc����"��e������RI[�|�ZNv�/�������7,��א���ߜ��֭T,`o�H�����gUH����-EU��ơ��ҳXH#}��pɤ�E�Z�;��>�U%�ئ���2��)�r��gI䞲u��b���9>�����z`�f �9�hM��Z��@1w���J�?�U�������,�@ӂ� v��̰���z=U�����p��F��F���j�2	o�$��a��60U}�G��15�_����L�F�p}2{�o��,&��3K��`h*�	��b�����"U�g[~��r.�<�����q72{��I�V�@B�5ay��1���?Ŭ��ҙ��vhh�l��k�tV��+'��KhM�~��$G�I�b�r�@�����=5:]y?��J�e�z*F?9���]�S�L�1�zS��`=:,��}�Q$lA&�7��TA�����p�!�>�����Q�&$��/���e�X�f�, �ou��6�ߊy�泍�*T� q�7�\}No��ج.���ቔ���N�&��4��u�5QoDQݓS%�c�g����5>a&����=��ߍ��||DC<�`{�9<!IR[l���L7�ʰ�H~-�O(��Rh�L�=���� �cjΰj]�j�F%z���Ѐ�����Q��/��-���h����\�A$�e��A�[�r�!���
��G��-}ɊgF���G#8O]�s��pk,��7��@\��b �Gs�ĳ<�`)�Whr)ň5�?����<���h��d��:�ElW�"�.�#��j���<=��3�i�{�6H�3�j���߳f#:P������#�_xo":<CN�P�5�CDt�ha�h�����ĠDԊ��t�琅!3g�]X?���J{vjqh�( ھ�Hy#!x�?�V/�� ��gn���#m�L�?�^G��2�����F��ta8r�뢬�8��$���O�FrY�Da#T�ጳ[,�ŠG�*`�gT˨ ��)���:'��ÈnE��eRy��m�!ȟ<`+#K��z�P@ )m)t�$�[� d3&l8{�(�Γ���a�bm�!�-�u
��KŶ�h96�"/�Zh`��(M�"��͖Pk
�}	�E2�`�i�c�4&ĥ�KhhMG��Y�J�P��:֓u�_��DL"������1�
��)b�)f놝-[�s���khk�Z��I�k�_��Ʌ[p���~���I�V"�+e��:�}z!��՟�^�Cq;��x�#��E�Bz5�r!"8���2�0�A�GL�
��b�Ʉf�G�$�vQ�q=Gry6UBNR�SS\������ެ���d�M�dg23ΤJ�@-$-�m6;�1�c]�H: �#������Ԏ3� ��w1E�$�b;��}��%�
b~�]ش��u^v��j֓��Cւ�񩮙�\�@�Z3Z��y��L�m�v�1-�C�'�7��e*�.���P%�)|)ܚ��c��NK���$(�Tmq����in%1�8�H���1��Յ��&L�	�����-Rנg,��a���F8�	������]B��B���ytl��p�Ӊ�M���E	��.�t4����P��VhL�����sh�g���ߗi���>�'��46��G(��ϰ����Q�\X.9hN��������W+4|�~Ї{9Zh��/II,)���n�[��>�'
Շ�Uб� 1{����C����Cd����hqN���Czċ꽓-�2��9ɍ��[�6��Rg���T�p�ɶ�?끐	&�&;א��([fX#	D�������)i'�G�h��(1
��Mm=���t���x� GSC�Eɫ�]}k�TMꐷ�}�egQ��/�ڑ��M��>r��هRr�D���idϦ��V�;��`xU����j��� �x�A�sy�Øz��2Po��8חI�3����b^�P	ʖ���D���U��%<�ex&z�V��r���������Z��L��mG���"	��c�� �n�O��s�K=ȵ��1��`�Wj�����Ɖ�HFl�1�D�D!�Zp�g��[MnU�0�(�L�� ��0�Z�@S#'���,�˳����h�@�L����l�\�n�
��MMe�ɚ�a����*�~B��Lʂp���)�9��*�
T��!0�T�+���j�`���H��D���*q1�j�����Vb[h�];Oǝn.,�vq�������2ݰ��� �<�k4T�>�M �{z�{��x�\%6A�hNoHR�ۉdsg�9����j�,�UT�n�:hi�3M뭍��6}رևܦ��|�s8��rlm�Z7�\�e�R��UE~O4�M�au䃸bm eS��W<.A�n�N��L�{h9mK��ť��:��Ej�+�a��f�Q�^
��*�#Fw��.��U��W����┳�e��pcH�Ŏ?D�XԌ�i�0�I�y��]�
 O�s]9t{�m\n���D]`�݅�m}X�DO������I<���̌=�f{�z���	�M6+�$ܽrܼo�����H6K3�/`'��]��<F$q���X��Ȕ0�:i̋�:M�W8u�5JG�#��b�СAw��
��㭌$���!^(�O��[s0��? W8���Y�əl��8.��vW�*
�nTh�Ќ��l�i�!���������Z��|,��2�%�:��ұK��V7#S��L]I)�i��M��]�k�Z���_ �f�B�\�#,���OE[C��5oY��8�:�����z,�KS#�Az�::%"j�o���Y�0ݗ~'�!�fc�����n�P`H�a8A���r�bw���pX`\�Z�+`_�4���j��v-t�?1��Ea��y�,�f���
t�j�d�g�c�k80��	oqUz��n-%��U
<S+���&��4P����=�eTny�Е��W+���M�ݻRO%L:�煇um��ٙ��- �m�,	'n�6h�S����=�Z�S�se3��X�?L����wM�����	Z�^H��f�@GڶV B�[�+`8nUP��a�M1:N��lܡᏆ&�_��!�$=s�S:I�J�P%�B�wȡv��j�>3e37g'�p�=Q�c�t�D�E�i���G%�te#����wx�t�H|̄�E�X�گ��)4sK���J�C���'��Z��drA�FTC��zI:�#HVCP�_)tI'���6��4t2J��}puC��k(Ze���^    iviHK<���pVWA��g�� �tȵ���k8aO�BvJ q�Cr��\��]f
R
���g�G� ��ׇ@Og���t&��m��}����?�߻���/����~��N���l͒}5�뻿�������s�ΌKѻ�Օ�������˭;�w���ݿW}k�����[�v�i�7TL�_���s^��B��ҿ�&.����ʚH{�R�.�屁M`�y}?�2T*G�'��y�Pg��ةX����1�c��D�1o���Ȱ��!{b��^5�}�v�1��Œ�3�i̻��'A�e��Ǘi�(�:��p��Ȱ
L�9G��L�o\Q@�a�o�
t�Ҷ��򉺹��H��E�?�u8X��ƹQ1��Vw�l�:�v��.��?2J+J �i�-R�T��Kۆ��E�eĈ�n�a�1�x�p*������nCcd�M���d���:`�H�f�]u82r�%��o'���iq�>9�<4Y���Y/��/��<j�L��ؚGu"��O�x�U�j�@}��>]z�.8��;b��a�}����C�߮�=�M���Q�N8�/X��]1k�՘"���eaۛ�q7-GgH��HN����SzS�\�Pؤ �gC,C��I}���D*ػ��Wn6���m��j�����|�W���,f�>hkuP�7=���;�^�$�x6��}��pϥ�Y\�"�o�e�a��a#�<R�2��oqB����e��F�^A*SU��LF"�呴���~����JJ.R�f��Xq��>�a��Ɯ���&���F���x ��Sc���@-3n B�E��M���^�j��'˫��8�\,&�3�:�<t���H,d��:�v�KK�K��� 9��	m[�7��(N��3��jZ`(a<����+>A�����w;e��럃�&, I�~ϧz��<�A�ch��#�����ekj�m�l5fl(��#�)m����0RZ�t]^-?�)�6 ֎R¢#S�}����~,�)�����7���{Y���'��1_ޜ����U�Ļkya��Mp���K�����t�:���#��᩼yt��P��n��x��d⠢X��`��\!�r�F� �m�ߤAxZ%x��ߙ�A.>"��9�*~���(��S�G����Ab¯��(7.��Wr)���2�%Ef�3�f�P��6#Ғ��X�)L|_"�J�6�p��BS��ϛ�y��F��3���*�1��h..;�,`k������E�Kb�Aw�W;�[ZE���De*����k��{9��l�������{z�̠Ʀ7��|��m�������w�1P�/���������]��.�_4�J�ݸ}ѺYe��V�G�V`�ϑN2%�B��ݑ���q�Z��XU� �t4u�����vX�������ڰp�k������ץ/��'�7�3A�;��a?Ss_5e��5_�]�D{^�ƃ)d���.��a��ϑ��J�O���ޮ���wwg{�Z�Q�bw�����/v￷�#�p�.����ݹ{oo{�~ �)�/52Ev~�?m����������=cg쐄����ֻ[{�w�ol��۪�~g��[����xn��wU�����~X�HĈ��}�����o���v��<�F�x�����.�`w[����u#<?ۺo���{[;w�l��������`��������ΝݻE,�������7��i;�������P�|���I��ܽ���m %�����v��v��-���%L�-%�&������E����"�H��ۺ����3�>��ޣs�^q��FL���������R�n,GF"y{wo����{;�e�W�m�?߹�}�m��k�mFq�_���w�߽G
DW X&��vW��.^M��������`xW������pk�,�4ȅ�|�=�p�3��e^d�Im�f��M��_����!��\�@���2�����^�"�LR���OK+<���١&͂�U hv�xQ�ޞLo�ؖ�U���f�~�Y��<_�d��e~�=�AQ	#G�@ϺF���S$hrҀ%��Ͳ�>������Xx~�	��cn�{$�^s�}v�vӻ_3��
�`C�`I�Ԑ���l���ە	�+R�����I"��}��p.������D��*)�TH(�B͆�AA$�n��B<hq��©�>�����7�����E�����A)���c���� ��G8Hb�`��T$(��#��TE�<�1J)`��n�oqj�Ɏ���<�x�\%*V�,'���b��T���MsZ2��C�	������%�	���6R��u���a���x�Y�s��r��QL�c��ǹ{.�D�x�8F�yd���ʹ��K���M��hJ����	��lh�+H,������4�8��\%��S\�I�����D�)Q��+e��]Y/�gw�\:Q6�#S��P@��5VK찜�3	�-�\k��.ehƥ$�Y��iɓ���j;ym��"�ۺ���ǌN��[�GҖ�h����=�rHOq�¶LM���8w�p��'��|��`���y��������{�Ph*pØ"w�ƅVߚy|���r�Y�9�������Q�!�¬Ko�����	�7	eCJdH=�]��M#s> �C�qyP�Hqh?��{����b���He��I�΁����%W��p�U��u�Bi���	�F^��
W���|U{aLB�] .���-�C���ylj`޸�}h:Q'��x���ꚁ]N���fl-���q=z4���?<�aa��⹔26|��c�K4����CSxm/xN��
_\-�M�;[­i�p�Q�����.?�#�ɧ�*�<3f/�ʳx���}��.�Q\�"R}�����\����b�U�Ϳ�y�rf�4��cFr�|��7�t�֚M�t�R�W�?�%�"��>N�oM��A�� �u��Dl�~:��ej[��%֐eű��N>&!`���{YZu�G�T�u��0mn�@�!��wf�n���S{.���Q��0,<�@!O�Us���Gu��Y�Xk
@T�BC���J=��m0Sxʧ�����-��H!m9��>�\�u:��ɍ�r�2�ӈ�o�},mOrm���`�� ��k�Ӭ3��k�K�%I�E�nZ�_t�@��i�C+J$ߏ��%���^��ޅ]1:�oMj -
�����G����	a>7��7�;G���	S����ٳ��٧��V�/H��u0e�`�ڐ\Н�b�m���z�Nn/!��L���&�8�� ���1�xLq���a�Y�;���kϑc����q���W�y�vv��ޡk���$��^�`����jԝ{�Jڸ�i�Kn����%䁌��֫����׮ݭRx����Jr���BG!����]�p_L�?��3�/��x��ȗ�$5y7�/uhU8�[�&��Ԩ�ꆆ}��C�Hu-���(9�r��;��y]h�9-�	�4,�)xk�n6�	>zGJ�i������]���HE�-���y���>�3j�3���t�H+�t(���$��z�3:H�z�7�ь����f�Rj{��O���"T֝/%�HS���G7<��k�_ ��j�W�Jnl���W��=��ѫ�^J;���@�E�Ҳ�t���^�$�J����%�u������"��?6]hb-��vi��9�U���S��-���e
?�Gx��Ƃ�#ɰ7�,_H����@M;rZ��y��v�6"��#�q�x�뇜Hȧn�bG�?�K�h�-�>B|�qX]+}l!�}a��'��p7��\�vt9s�u���6>��g�B~ &����M��ԃ;1���7��R4�p�Ÿ�}�ɞ��*���1���JO>X��5E9B#�-n�3h�啋\�:_>C+
�}�nըdu��l3��Ǡ0\��-^mIG{�SWC�8�Ҿ�h����n�Xӂ�g��*I9C�����U�����Uˋy6+zAh-�d���5�g}�@�^-h�h�%.�d?�$I�&q�](ϟ��h
�Ѵ�Qz��-�y��٤O�*���`������W�?�{�qv�|����$ �  h�� �����mx�xw^���K_-�����ê��l�eo�����[G��b���m	���N��r�v�:���8D����?xw��{NP�Lݔ(��tI�g���m��01m
�?��<���Q� ��W�Ϊ�͏@HR\���n|�V�3j�PXO��7(p[���"�~J��>_��+��cz�,�����d�7�_F�3n��R�z-�2}�i�kJA,�kL��٫Q���,���}���G\��J��b��]�O�7�W���X�^�,�Q�xF)M����d��/�V��ePu��0/�̗$�l}���? �Ș�9���,�Dnmǔ ���Qqr���Vi8��!R�\xDy���0�k�\Ki7II���ȼ��AI��;~��ra�k�F̆f�E(+yb���}����۫�2�V�{��U���Z����O)���/�e�:�*y�	�P}�����W��T5��ԵJk���uk���N�[,�W��-9�A~�qr�l�
��p���C�� i��G5������ˋY�/	f�w��Q
:�&�)�3K3�9��i.s �_���j�&7�	�ѱ�%� ^���Th��}����c/���
K�ƺ�f\ �����ΛS�tq#���=B�W1�/	7�6��0����i��ˏk���]��]R΢����Ą>������r���%�D�&���T������:��2��.4ʟ�]�O�a���mpݦ�Ͳk�e��>*�9Tǯ�HA���#�~O\7-����]���AѼ��k��x&�c^���Ds}�6�!��?Nŵ�@-r3ȕ
��{��C�w���r�͞�h�y(bv���|z�%�QC�*|�V5�gsesZ���"Q�ϡ�N3�۫I�B]�t�ҟ�β5&���]s}�a���6�ܟN-f�
*б�P����T|^%�q��L}�Q9�K�4䗘�D��]<���w�O�.J�K�Ė{A��ʅ����0r{�Ų%�`ifj�S�3��|�+a]}q_���\ӻ��t���nbq��Ə�g��UV�2C�U
j$Q��Un�
<O�ڋߑ�X�t�]Rv ݕ.�&);��5?��W�Z=B�[t{���$���o��-����?�?)9!-R�%�üG��������:$��?��G����%D��ޭP��]�)�ώ
C� ��>�A�J��J�ֿ�v�֭�D��      $   �  x��U[N�0��O��j�y݅��!�~ ������J�����r����M+h��%�G+�3;�;k;a@��c��4�隞�Ќ�
��=�16�iK�4=�C�d��3m����ѬE�X�o��1q@74CƑ���'{����[i@S�^fM�
C��Pȶ����-UY\��z�S^#��6�>�p�`ő2��\]s
5�{��������%.��#���r��$
�-@��D�;K΍�j��;J-T��,$�� ��� ����͘�9T@5�]eE1�ö�=���K��P�×UX'���V;�����1�G[��}�V�6���c0�	��X%"��� �\��EFH�MB�I +^�����8ro����/g�h�=V�������`�������A��!�H촩����c@״u{���c�k ��R����J���G�C�2B�����pX������?}�#g4�	��yY)s|0,�j��3%�N��C�4"      %      x��]�n$�u}}E	$h2�؎=2�y1�|� gb����efd�~"�g�� ��DdY;p`���f7��7���_З����眪j��,Kd���\�ٗ����7���a�_M�����������_ݺ�����>�~��j^?��E5�fE5��ꪚ����O¿'��>��դ����=�QQ�·.�u��[O僫zX���պ���a~X���jYMW�o�x�|5<c]T�����0�'�|gO�S�-·�����pq��*Nj���(c(�*�Q��~������GE�u���S�����������՗?zw���[���o}x��݇��ߺ����xX��a�a��J����G2z��~=l=�*�}~_�~��9	����a[�'a��AxL؜j&r�}n>�c"������Ɍd��gyP�����6+�.�Ĳ9K�R�|�K^������ɘ�R�����7e�eKd�Lv~���Se�(K��p	n=�&4
�9�v�T�h�*h�0ذ4ku��C2�}�|}����������_�����v�O��q����,9�4�|��`f�c��",&�~&|��r�+<�B�$|0�Zɽe� �{��I��c��2
�]`o��N?w]`H���{x�\'}(�����Dt�:, �ڑ��>�C��<����s�n6�.����)ƐKN�,,N.6r�r��A5d��7�2��<|q��¸L�q��F��3y�7�ɢU�B-��ɲ��~*zFԈ>��d�u
i�%NT �L�o�&�~�c#?RP�#q�D�D�>��ด���ۨA�/�mO���N¤EF�DQ�- ra���~���SA\�*��z����u,�Y;6]!�;��a �ѭz+9E�.�0�9�z�
��eJ��6Ejz��TDr�u�U����@�o"+}��Lwz���OJ�]�r��}]�>q�(��)�2���*ur� ?��an�Α4&R�H�1{8�bf`b��w����p�jA=�#,�����2��,G�|��o�-]��@D��.��D���++:]�@$�G_֓A/E-R��"��_.��ɓ)�����(8���AAS���� Ra�'*���]��<{Վ�*I�Feč�s�|[TĄ
�v:<��N�J>QM�*�2�L�WA7\���K�b��7R�(���e���|����r�����n�������wnT�1�S�'�7�a���8~x�;�?�w�N�p�^��[zd�@渠��3(�G��e��Z�ݩ����z<��(j{��t�R#y1�D#4�g�P&bDu6�Q��U1�4�aT8�<��s��RF�+TJg=�,T��8�Ͷ�e��E��C?��v�Rq��gg*.��ͣj���.Պ��Q��o��/R�J�gp!�/:�5��Z�>.�T}uEh�Dߞ�Z�*�������T/���*���u��Ф�zi.P8g2�+�J�ҥ,�����G�;�Z\�	t��U���'����Y�X���@�����^j�W���7z�k8Q%�[��w�Pa{urAo�ԅi���L?�����/p��x�F��de��g7�c��H���m�\������W��),9��*b'��JMҀR���6J��H�j�M�����,�ua��P�ؗ��6��Kܻ诧���3�s7#&L>�ԎPb����|T�q��!��'EdJmL����O}�iQߘ���
:$S���WEо��Buc	�u�ްE�p?�p���M��TWp�*ys�A�'��H3�k�U�E���	�F��*�c�;�Ɦ�| ����9g�;���T�6�=�	��c�~.,3j�n]�g�~��=%��?ü�vŹ��j��1�Q�YӢH� �t�K���0�а�X �p��t��%E; c{�+�,��)L� D���c$2�=�Tt����ӥ˼t猎���c3lԘ��:�Ǖ��pN��.\f��U�Z�i�g����p3�$��ll�e��4ιa����V�eȨ}M7����KC�5��\z�q@M7��:��9Y�KY5������~�jj�i�}SsG���ꐞ�b��B�,�6���B� �0�h���n�>�"r�zI�b
Jt|iY��K'�uT�]��%.�kRq��=l�,�E���	��q�HEn'gc��:�Dv���PyoÃlٿa���P<���a�{���XE�_<��:�}�F@f3�w�$|yP�Đ*�`3>8'�HÜ��Gt�p�+'�2j�k��`LG˲�����B��h�A�f�ZO��D��(�h�Sl��L��C|#Z�O��a������Mu^��C��h+��S�'�U�5���uJl�؇gN��1̖�C��ej�P�	�XՑ�����b1�#jr��|�[���=�m� ��O}��ih,�;o��S�������]�4 o�p8b���������}���o}�[o���[����k���cبj�,8r���lx6s�QL�D!m8�S@�'3�/b���M�r��)}F"bK���ӊ�v*�MpT�$��iId�O<��k���;7����5�sK��3����y�h��&�	��8��q����5���i�;]��'�%&⾥`AXu�r��f+�S�ܹj����4	���ɜb犧�ց�Q����#r*+O:�C�>졈EP��˰���n[qظ-|��݄�ۅ:��@[�/D&����)��ݿ}�οݺ�"��7����<�(���fv]࡝[�}�S��i��{���,�'�g���/'ј�"
9�,đ���#e�4A�z��&�K�y��̲]���%R��(42L<K+D�"�3��j]�s�X_�<s�RwJ�a�;b��ȿ��o�S�%�y��� ��2*��
�q(������Ͻ��S?m&�ԓ��qF�H>�T�{�1�D��ӎ�Ey5]"�0�QZ��@	�tU܇nAǭ�&2�M��<�d; rs3��ON���"���4=ӕw��՗�o���S��d����7ʿ���xx����Q�+�x�F�3�*� 3��m.���W���>q���Ќ����i@8��e�')ZK��FPF1��u��.ϧ��sCݩ�q����2Y�z^^����i����V�e�N.��>�WV1��'f�zn����.yv�e?"�yZΔٕ��3���O�-��h,TA7Mc9�`6\��FXr��K.o��-��R
�$S��0�Pi��
�E���3d��6~�.�Z��9�2Ca�5���k(3X1�ЩTߚ��3�;z��KôZ��+u``��l���KhR�轂t���E��T��E����1:uZu�扔�7���>�g�7�怩�#���}���-�Ŗ۔���d�.�%EDt+[+�>��&̶�	'��'��W��\|�Za)t�ɮ�8w��x��Te {���!2	�<W�]�݅�	���h��Q'�P5#��X�������A1�����A�	jQ��[�R��n�+fr/DC*���u-D�.I�g����>C����	��\n������Uֈ��H���v��L�	���Y��YVN�E���hD
au5�%��ձ�z(1�U��Ќ̚��2E��1!G루�v�;z~��ӈ��(���"��n���)�}FnZ)ʏ�e�D4T�8v����U��j����)⡐�W�n��$q�?�8O&,N����
����RA���!ţR��	A����P�K���4 ����d�-=*!
��D"H0�DE�����9��j��c����Vz���S��_��1&�7�$I] �K�}3M�(���A�r�wz���T�������7�`a��P�ȷ|�a:�Q� I���	E��
q�r�,.�$eH]iR�	�L�08�����5@���Ri�9��d��'��B�#��'�l��4�@ⶑ0����k7,�6i蛃���De��^�J����.#5��H���:��	�'c�dG��7�Kw��xn�zA� �d�puT�t�	�ku��	�v�jZŤ�e4S��L�䔦~r	��ԙO܄��MùT7���ˏ"&�1>�g��9�G
�~喪󄹫Q    �K��9%-�':���1e��|Y��eԘ�Xp��E�Tq�`x�B�c����ʨS�J�*I(�2�{�d4��Ӟ���X?�L5���X�Hq��3�eDkbI�5HGɾN��m����<[S��F��l��K~�p׀�:<r��ό��j�a�B�G��2�d��!����!�F�x�$'iX��kxFze���3���X�7�}�eL��� �8��{��N���nd�Q�dE�X�j0����*}���7Ff`d�����?Sh]�x�M
�S��/*��+�i�Z|"�'mT+t@�^h?��^���%1D�c�;�h��$Y�&�!��-bGc4q �gv��2&��;��<|��/ �Fu��� Xc��X�����5��\Ţ�-�5��1�*a��>���S����T���/|�έ����ۼ�����dX$�)@���в)��=!��B�k-�n��Y�wuH�-t��2;� ��A־�NZ�B�ę��k��q���F� G�*G�2��N���
%rB6�1mM����Iy�fUOe
s�����ظ��;��Gud��0�&`��r��\��I�)Ӷ#+�.uߊ?b�ʄ�n�9F�;����=�8J)�,����~���hX���(�D%���5i��+w߽�����p�`��w�4��'�R��sO.-^R$d$�H,��ذ5��&N�E����	P�Y����i��r)Rj���VI�A����X�c��6q��c��#�{�nYރ��sN1��p�����[�g�5̉s�\��J���Y����NP�D>����Iږz��A^���-�+�N�j!OP_�$z'��.R�.z��%�ՙ���8���k�U�MEph{��D���u7��4n��H�:�^�ʮY�U>�ȱKr�,&~��YC��.Hc���-�/��\�S�z�(�� ��㶖L���]�@+#�/�8X��gDO)]������L�0��a�B��)K��l���3\�:���i �Ƙ'�wɜ��6��Np�ʰKt�~�蜖�>�BY�vӶ����s�4>�yM�r^n�|�����L�e�k|پ����0�2Z�L�F:C�� 3���L�� 9|�d�'b��Y��:f�vi��-.��^N|�F���[��e��p[Ъ��}eg�Q�yPK�+m����'��g�z���b*:K��]�!��1MTD�,�v��+�p% ~�_S�*�@M�B� g;�[š�TAћ4�Ϊ��W(�������*�cD��M�J�U����2�#WA���E��K����U��RJX���Z��a,+���c	/��RNz����H�*f��)��{������'.!�"�ߡܺbw�PY���#����t|Jx��)�`ge���/�FN��8y��4� ����b�(-3��ޥ����!�)L�I	���Vm��WN��Pr��5@`�uG�������J���3��Eӱ�J3��d����b%�q��bw��Ş
l�@�yΐ�l��%x,g�E$�]n����k�aF��d��
���U/1��5~,56o���\�ij�&�W�r%��O>Y�m;���()Pԥ�p+��?z�έ��0$�;?����{���w���o��zp��|3����w�:q'&�-A���v��J�=�Nj�p�k:Ʋh��-�x
���a��P�k�����YFZt����X�Jqig�6F�,E�Z�
��M78�@bp�X���)"��]ȷ�r\1_�R����IS��k��V��oB�h=1$l�%Ne ؄ ZFs�d�:k�XN��QA�j�� ��UE���Le�e/Z�����z�Z�҂QyP^>c+	-{�{�	�F���E�A�x��[{����l��f�:D��K�i�<'��e%q,:�1;o�C�͔�Z�|�>""9�ڊ��8�`>�	n�����B���(����pl�~RV;�,SB�ڍ*N3� s�@�M�I�h��e�����iO��C��tdds�_ȋ-�W�'-���d(
;M��S��FZ[J�R:Rg���R�t���3$��dw�s�N�&�GM�tOS@�9�NK�+N��4QsJ�"E�uP��� ?X�$���;���`q���V�`/a3k�*/Dk��O�T���NŦi�ƚ�}+�ۍ�j�D�?ޗq�2�xC�4|������8t���֮dUxq��9Z�pJ>6M_8�i�eޔ����^κ�]��xB/B��=���ܞW�Jھ{�nʓ�w�߀�ռ���#^��B�����y�����5v���٪��$��O^�I��&ښWh�,~mC��{�(�	�$Y��o�GV-"t$�:l֨���)k�sd���D���Su൓��K��h7�!�ga��&�mt�)�-ϙ�|�n��O���F�?�3����"���2{bq�G�vG�15Kp6kuc�3�j�f#��r���M�ͬ�͊`�AJ��|0�i��6�G��+0�Y�$�֡���y�$�u5�"R��)P�����$�ߴxP��K�gZ(`-���M��xlҧ9���k[�:ȔVJ���J��Kߞ���ˊc�b�s(�t)���9���&�6L�c��$��� ��)J(RwF����ه���P���m�oc���Ò�&��M���F��m��
�� @�y?�A��tq�����,��Nc7KzD�P�?`.��Ճ �eX^d��w�S�����*K7n�k@u����$'f��k+>�o���Dq6h��-�'��WlN�S�[.l/��5��z���f���c���+����:;_7+��8�S0Ę��ߤL�1�C �k.�O�Ȓl�,�Guޯ�ȡ1cF]$����t�Q�"o�$�����h0t묺�
�Ĕ���a�j���� ��KKiy�U����ei�I$�J�����l7�f%���,gǦ�:IW�#;� g���9X��c��/	��a�4`,#
�s��CA�+ځ�-tJ^ǩ��>{,�����+=������!�cz��lt��S�Iye���vF�%t�J��-����C ˍ��v�j��\n��/V��NVP/`ґ#��a,w^j�(����;�����L�e�Df4���1�~�tg{����	k�	P@��S�e%3G���&Cm�������$;O��� |q�1����N[�cA��$A!辝M�P@!ӈ�MOg\qj���W�d����>,|Qr���e�~J� �ꂐl��N���/09�d��pj�H�fW!Ͻ���P�k���N1&c�z?�)�v��&��2F��3��q�ʦT#�)?3zl6嘴�MfQ~q���w� #��v��X����+lƻ�to���;a�}xG#�g�o�qG2v�&?�!_�~�x�׻�{9�,����3کy{��e������~�Җ�W�����z��5xH���h��ؤ\[5�#bs�Y#�i�;�����'5�����vvojD�m'nJ좲�m	�':�� ��V���+�`N1D+_��d+����Z{DG��VR%�/f����zJ�E3�aZ�0;�4y���e��{�D��}NRk�ɑ!P3xJ�M;b��%J0�C���ʚ��<�R�>��Rə���خI	����1Fm�W=P%�e�;�E��$\��
SS���Ջ��vb�Q/�7��jd�Jc#<R�fe���3`Ӱ��.3��Rx����*�M�a׸nӤ�n������9 �V�Qե�P�؎P��Z���\�<!�n�"8�Tۛ�"�[�e���[�5K�:�4���������5�k-Z֚
Jzjje���V�g�#�w�٫.{d��aV���
���ږx.�#U��y+�(e�7����4O��}���\�q�����,D�7j�,�nQ��c@�����G]�2��:Mc���S���	�x�ojЭc�Y���*M�L�k�SZ�u�T���n(I*3��w00�A�u�bIs�w^���	l�*��V���ÑU�"�Ƃ�νu�	�Zc�oŀ�Z�B�H�#a����a�����ܗ	�J{?WHт*���紹��t:�Tg8���g��|���P3ŪS& s  O��8 -_<c	�*iM#�dk��F�6�wL)��O�e:�i4R�|
�5qX�o��XS��HXNZ'a\籷�"?P����Wd"�rt�"`DП�PԦ��fZ��7�7v@L5�������>"���}�53VѲsS��ǉ?r���;]|��$��~^������?�y���IA��~gsA�?������o5J��k���tS)⦔�����w7�MZn�PN��3~3�-�oɛc>�Z-�:���"Y�a��A����-��u���7n�I[�Y�.#%U��9��՗�=��� }s��&��k5�c��V^����j�	]&�*ȸ,7-7��:=mr�tL{w6�[��Ӕ��Հ�^h`�W�����Wp��,�;9����)��I7r���3P
��]�N[D_25mo�JԆDGS�U��ۖ;����ga���-�毝[n�)l�{��7ɠ���4J,؄�F�/jӆ�v��0D�d$Bw���Ti�.�/S��)�9��Z���g��'��MǕK}�Q���m�5��&��#��T�q�w�Q�ui��Q@�h��t4
��ի�`�a�J���Wt�W�;FajǴ��P�%�K]ŷu`LS}͖cWO=�����F�s'�)k߃+��b�H����ƫ���P���[�Ĩ|=ٚ��cO����)5�%׼|�٩{ݾ^���D�4F�/Y*�qY1aJ%H?�	��ERì��ET+crP͡n�&��
�+�n]��5�ц9�k�J)� ����$�^=�
�43}C
�2E�T��ń=J�&x�9^i�}�k��Cܳ����K�>j�"
O8v�a�g��8e���*�E�k�!��k�*=X����(���?*oꄮ7�M��忛BNZ���l}a�:"iC������2�e��J�G����[wnߺ��1����`Ŝ�)��K������Z-w���%\%p�����L�r0՝��s0�$tz�<7��Ŝ��e���"�ðg��:�x������@"+� ��b��퇚��K�i�]ɛ�S�QE]O������/�\�U�fb���P�ŝc���w��}�HS7���E����jZ��p�����]t�ݍ����Γ���2�J�G] Wjx7��H,>Uoы͢�n�͠�]3�l@�^���{#^��Ũ��7�ōP����J�
���΂ �(��f��M�VV��2o���Y�P��ܭX�e]1�����\��ɚ�z↵���	�*i�Q�m��>2���B�;��m|A���nͰ	�.L�;���Su�@�L�iW��Ā�?`ӻ/�"AH�rN�����hHQ蟒��qZ�ˮ�J�W-U^_���J�n+Ea��+��OKp0B���~��奙��v�м+W��T�C&�|汅���,�1��������Eu�EW<L�[>�%��P���.{U��E
�$�%N�a�s�D�]hb#*#����W���z��1�C�~L;�1&{.��O3�}?A�X�ۊ��[�e� �#�sW�6:q�.�s2�eg㣌���~�Jv=t�}ӆ��䠳o|�^�/���Y�*�!u�g;�̥�t�%�ئd�=*�=��h�Θ`�[ޥ`��uBEڮ��a$Cqd��(i�QK�x5]�{��C��w����/���͛�y��3~g���^�?�)�x      ,   �  x�m�ɒ�@�<���*Hj9�4ݢ��+s�E���o������_��F��Hf�E`@#N��0WC�2-DØ���l� �>e\8�2�$��/�ty� SΉ2�ݨǴ.��U���h��IpsE���(�>�#�Y��]+�޷�.	�ճ8�V�ZD�js��t�d�'��L� �>�3�YA��I���}��%��Dü��O�u��d�$�?xk��P�0����4{焯ߖq��-Rƫ�� H
�k�أ�1~����r�l!u�V�����}��I+R�^.g�iY��{�w��Ӓy�l�á�Ql���*�#Y7�J0.�d�շ4�L'H��xJ���|E���A0�mv[|����Z相���ir[�O�H�"�Ӛɰ��
�	�8gFȆ4���ω����w?�Rg��DA<����b�j���N��c=���:Z��� �ծ�     