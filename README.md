# Практична робота №7

**Тема:** Реалізація операцій CRUD засобами TypeORM та PostgreSQL у NestJS.

**Варіант 10:** Зоотовари.

**Студент:** Тарновський Артур КН-41

## Мета роботи

Ознайомитися з використанням ORM TypeORM у NestJS, навчитися розгортати базу даних PostgreSQL через Docker Compose, проєктувати сутності (`Entity`) зі строгими типами колонок, реалізовувати персистентні CRUD-операції через патерн репозиторію (`Repository<T>`), а також впроваджувати offset-based пагінацію, фільтрацію та механізм м'якого видалення (`Soft Delete`).

## Виконані завдання

### Рівень 1. Підключення бази даних та створення Entity

- Налаштовано PostgreSQL 16 за допомогою `docker-compose.yml` (без застарілої директиви `version`).
- Підключено TypeORM до NestJS у `AppModule` через `TypeOrmModule.forRoot()`.
- Налаштовано автоматичне завантаження сутностей (`autoLoadEntities: true`) та синхронізацію схеми (`synchronize: true`).
- Створено сутність `PetSupplyEntity` (`src/pet-supplies/entities/pet-supply.entity.ts`) для таблиці `pet_supplies` зі стовпцями варіанта 10:
  - `id` — первинний ключ `UUID` (`@PrimaryGeneratedColumn('uuid')`);
  - `title` — `varchar(150)`;
  - `price` — `decimal(10, 2)`;
  - `petCategory` — `enum('CAT', 'DOG', 'BIRD', 'FISH')`;
  - `packageWeightKg` — `decimal(6, 2)`;
  - `brand` — `varchar(80)`.
- Додано автоматичні колонки аудиту `createdAt`, `updatedAt` та `deletedAt`.

### Рівень 2. Персистентні CRUD-операції через Repository

- Зареєстровано `PetSupplyEntity` у `PetSuppliesModule` за допомогою `TypeOrmModule.forFeature([PetSupplyEntity])`.
- Впроваджено `Repository<PetSupplyEntity>` у `PetSuppliesService` через `@InjectRepository()`.
- Реалізовано створення нового зоотовару (`create` + `save`).
- Реалізовано отримання всіх зоотоварів із сортуванням за датою створення (`DESC`).
- Реалізовано пошук зоотовару за `UUID` (`findOneBy`) з генерацією `NotFoundException` у разі відсутності запису.
- Реалізовано часткове оновлення даних товару (`update`).
- Перевірено збереження стану в PostgreSQL після перезапуску сервера NestJS.

### Рівень 3. Offset-based пагінація, фільтрація та Soft Delete

- Створено `PaginationQueryDto` для параметрів `page`, `limit` та `search`.
- Реалізовано вибірку з пагінацією через `findAndCount()` (`skip`, `take`) та пошуком за назвою через оператор `ILike`.
- Впроваджено м'яке видалення записів (`softDelete(id)`) із використанням `@DeleteDateColumn()`.
- Додано окремий ендпоінт `PATCH /pet-supplies/:id/restore` для відновлення видалених зоотоварів (`restore(id)`).

## Використані технології

- Node.js
- TypeScript
- NestJS
- TypeORM (`@nestjs/typeorm`, `typeorm`, `pg`)
- PostgreSQL 16
- Docker Compose
- `class-validator` та `class-transformer`
- Thunder Client

## Перевірка роботи

CRUD-операції, пагінацію та Soft Delete перевірено за допомогою Thunder Client:

| Метод | Endpoint | Результат |
|---|---|---|
| GET | `/pet-supplies` | Отримання списку зоотоварів з пагінацією та фільтрацією (`search`) |
| GET | `/pet-supplies/:id` | Отримання зоотовару за UUID |
| POST | `/pet-supplies` | Створення нового зоотовару в PostgreSQL (`201 Created`) |
| PATCH | `/pet-supplies/:id` | Часткове оновлення даних зоотовару |
| DELETE | `/pet-supplies/:id` | М'яке видалення зоотовару (`Soft Delete`, `204 No Content`) |
| PATCH | `/pet-supplies/:id/restore` | Відновлення м'яко видаленого зоотовару |

Додатково перевірено:
- Збереження створених зоотоварів у PostgreSQL після перезапуску NestJS.
- Автоматичну генерацію `UUID` та часових міток `createdAt`, `updatedAt`, `deletedAt`.
- Роботу offset-based пагінації (`?page=1&limit=3`, `?page=2&limit=3`) та пошуку за назвою (`?search=...`).
- Повернення статусу `404 Not Found` для неіснуючого або м'яко видаленого товару.
- Відновлення запису через `/pet-supplies/:id/restore` і його повернення у загальну видачу.
<img width="1293" height="337" alt="image" src="https://github.com/user-attachments/assets/c4eb147f-5a37-4595-92f5-b369bf7b4139" />
<img width="1309" height="321" alt="image" src="https://github.com/user-attachments/assets/af36b694-05b6-4e4d-9da6-134d1b10d8f4" />
<img width="1304" height="326" alt="image" src="https://github.com/user-attachments/assets/0673ac60-2da7-4dd0-a225-a40dc88ee9c5" />
<img width="1297" height="358" alt="image" src="https://github.com/user-attachments/assets/dac011d8-ea1e-4b58-998c-9931e149dcc0" />
<img width="1307" height="352" alt="image" src="https://github.com/user-attachments/assets/fff8f084-87bd-45c1-97fd-775f9755f606" />
<img width="1288" height="372" alt="image" src="https://github.com/user-attachments/assets/258ab92a-50f9-4e32-b376-0b73d23ebbd8" />
<img width="1289" height="548" alt="image" src="https://github.com/user-attachments/assets/e16df4c1-97b8-4778-9398-d2aa9dc1a54f" />
<img width="1301" height="549" alt="image" src="https://github.com/user-attachments/assets/ab9f13c3-6a53-4a47-95bb-10d2bed56d97" />


## Запуск проєкту

Запуск PostgreSQL:

```bash
docker compose up -d
```

Встановлення залежностей:

```bash
npm install
```

Запуск NestJS у режимі розробки:

```bash
npm run start:dev
```

Після запуску сервер доступний за адресою:

```text
http://localhost:3000
```

## Висновок

Під час виконання цієї практичної роботи було налаштовано підключення бази даних PostgreSQL у Docker-контейнері до застосунку NestJS за допомогою TypeORM, реалізовано персистентні CRUD-операції через патерн репозиторію, offset-based пагінацію з пошуком та механізм м'якого видалення (`Soft Delete`) із можливістю відновлення записів.
