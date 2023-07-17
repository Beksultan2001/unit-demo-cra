По всем вопросам писать в телегу https://t.me/beka_omirzak!

# Инфраструктура 
- В проекте для соответствия сообщений о коммитах формату conventional commits используются commitlint и husky.

## Как работает
- В настройках необходимо указать свой токен GH_ACCESS_TOKEN в секретах.
- Клонируешь репозиторий к себе.
- Локально запускаешь команду npm ci && npx husky install.
- Создаешь новую ветку от ветки master, в которую вносятся необходимые изменения.
- Нельзя выполнять коммиты непосредственно в ветку master.
- При каждом коммите в ветку выполняется commitlint для проверки формата коммитов.
- Чтобы выпустить релиз, необходимо создать тег в формате v* на соответствующем коммите. Например, используя команды git tag v18 и git push origin v18.
- После того, как тег создан, выполняются проверки тестов. Если все тесты проходят успешно, создается issue с деталями о релизе. Если issue с таким же номером уже существует, он просто  обновляется. Затем происходит автоматический билд и деплой проекта. Детали выполнения workflow можно просмотреть в разделе Actions.
- Если требуется исправить что-то (hot-fix), вносятся необходимые изменения и отправляется Pull Request (PR) для проверки и слияния с веткой master.
- Когда изменения в PR проверены, и все тесты прошли успешно, выполняется слияние (merge) с веткой master.
- После выполнения слияния выполняются проверки тестов и происходит автоматический билд и деплой проекта.

## Остальная дока

В этом репозитории находится пример приложения с тестами:

- [e2e тесты](e2e/example.spec.ts)
- [unit тесты](src/example.test.tsx)

Для запуска примеров необходимо установить [NodeJS](https://nodejs.org/en/download/) 16 или выше.

Как запустить:

```sh
# установить зависимости
npm ci

# запустить приложение
npm start
```

Как запустить e2e тесты:

```sh
# скачать браузеры
npx playwright install

# запустить тесты
npm run e2e
```

Как запустить модульные тесты:

```sh
npm test
```
example
