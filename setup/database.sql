create database avtoservis;
create extension pgcrypto;

create table services (
    service_id serial primary key not null,
    service character varying(100) not null,
    info character varying(100) not null,
    photo character varying(100) not null 
);

create table servicewizard (
    service_id smallint not null references services(service_id),
    user_id serial primary key,
    info character varying(200) not null,
    phone_number bigint not null,
    photo character varying(200) not null 
);

create table spareparts (
    sparepart_id serial,
    service_id smallint not null references services(service_id),
    sparepart_name character varying(100) not null,
    info character varying(1000) not null,
    photo character varying(200) not null,
    phone_number bigint not null 
);

create table admins (
    admin_id serial,
    admin_login character varying(50) not null,
    password character varying(200) not null,
    role character varying(32) not null check(role in ('root', 'admin'))
);

create table settings (
    email character varying(100) null,
    phone_number bigint null,
    adress character varying(300) null,
    adress_link character varying(300) null,
    info character varying(400) null,
    telegram character varying(100) null,
    instagram character varying(200) null,
    facebook character varying(200) null
);


insert into services (service, info, photo ) values 
('Автоэлектрик', 'Прикурить Аккумулятор, Компьютерная Диагностика, Ремонт Генератора и так далее...', 'electric.jpg'),
('Двигатель', 'Капремонт двигателя Восстановление и/или замена узлов двигателя', 'dvigatel.jpg'),
('3D развал', 'Стенд для регулировки углов установки колес автомобилей - модель V3D1...', 'razval.jpg'),
('Хадавой', 'Замена колодок, замена амортизаторов и так далее...', 'xadavoy.jpg'),
('Вулканизация', 'Прикурить Аккумулятор, Компьютерная Диагностика, Ремонт Генератора и так далее...', 'vulkan.jpg'),
('Трансмиссия', 'Прикурить Аккумулятор, Компьютерная Диагностика, Ремонт Генератора и так далее...', 'transmis.jpg'),
('Кузов ремонт', 'Прикурить Аккумулятор, Компьютерная Диагностика, Ремонт Генератора и так далее...', 'kuzov.jpg');

insert into servicewizard (service_id, info, phone_number, photo) values (7, 'Вопреки распространенному мнению, это не просто случайный текст.', 998903253632, 'xadavoy.jpg');
(1, 'Вопреки распространенному мнению, это не просто случайный текст.', 998903253632, 'electirc.jpg'),
(2, 'Вопреки распространенному мнению, это не просто случайный текст.', 998903253632, 'dvigatel.jpg'),
(3, 'Вопреки распространенному мнению, это не просто случайный текст.', 998903253632, 'razval.jpg'),
(4, 'Вопреки распространенному мнению, это не просто случайный текст.', 998903253632, 'vulkan.jpg'),
(5, 'Вопреки распространенному мнению, это не просто случайный текст.', 998903253632, 'transmis.jpg'),
(6, 'Вопреки распространенному мнению, это не просто случайный текст.', 998903253632, 'kuzov.jpg');
(7, 'Вопреки распространенному мнению, это не просто случайный текст.', 998903253632, 'xadavoy.jpg');

insert into spareparts (service_id, sparepart_name, info, photo, phone_number) values 
(1, 'Замена Бензонасоса','С нашей командой мы предоставляем качественные и надежные услуги нашим уважаемым клиентам только в автономном режиме. ', 'nasosbenzin.jpg', 998903253632),
(1, 'Замена печки радиатора','С нашей командой мы предоставляем качественные и надежные услуги нашим уважаемым клиентам только в автономном режиме. ', 'radiator.jpg', 998903253632),
(1, 'Прикурить Аккумулятор','С нашей командой мы предоставляем качественные и надежные услуги нашим уважаемым клиентам только в автономном режиме. ', 'akumlator.jpg', 998903253632),
(1, 'Компьютерная Диагностика','С нашей командой мы предоставляем качественные и надежные услуги нашим уважаемым клиентам только в автономном режиме. ', 'diagnostika.jpg', 998903253632),
(1, 'Установка магнитафонь','С нашей командой мы предоставляем качественные и надежные услуги нашим уважаемым клиентам только в автономном режиме. ', 'magnitafon.jpg', 998903253632),
(1, 'Ремонт Замок Зажигания','С нашей командой мы предоставляем качественные и надежные услуги нашим уважаемым клиентам только в автономном режиме. ', 'zamog.jpg', 998903253632),
(1, 'Ремонт стартер','С нашей командой мы предоставляем качественные и надежные услуги нашим уважаемым клиентам только в автономном режиме. ', 'statr.jpg', 998903253632),
(1, 'Ремонт дворника','С нашей командой мы предоставляем качественные и надежные услуги нашим уважаемым клиентам только в автономном режиме. ', 'mator.jpg', 998903253632);

insert into settings (email, phone_number, adress, adress_link, info, telegram, instagram, facebook) values 
(
    'sohibsharipov000@gmail.com', 998903253632, 'Город Ташкент: улица Шахрисабз: 56', 'https://www.google.com/maps/place/Tashkent+City+Park/@41.316655,69.2462954,17z/data=!3m1!4b1!4m5!3m4!1s0x38ae8b40d847941d:0x5765a18b352df71e!8m2!3d41.316655!4d69.2484841',
    'Мы всегда к вашим услугам 7/24. Вы можете связаться с нами в любое время','https://t.me/avtocambat','https://instagram.com/avtocombat', 'https://facebook.com/avtocombat'
);

insert into admins (admin_login, password, role) values ('root', crypt('root', gen_salt('bf')),'root');


select 
    s.service_id,
    se.info,
    se.phone_number,
    se.photo,
    json_agg(sp.sparepart_id) as spareparts
from services as s
left join servicewizard as se on se.service_id = s.service_id
left join spareparts as  sp on sp.service_id = s.service_id
where se.user_id = $1
group by s.service_id,se.info,se.phone_number,se.photo;

select 
    * 
from admins as ad
where ad.admin_login = $1 and ad.password = crypt($2, ad.password);

SELECT pswhash = crypt('root', pswhash) FROM admins;

update servicewizard s set
    service_id = (
        case
            when true then 1 else s.service_id
        end
    ),
    info = (
        case
            when length('salom') > 0 then 'salom' else s.info
        end
    ),
    phone_number = (
        case
            when length('998902060398') > 0 then 998902060398 else s.phone_number
        end
    ),
    photo = (
        case
            when length('salom.jpg') > 0 then 'salom.jpg' else s.photo
        end
    )
where user_id = 2
returning *;

