const webdriver = require('selenium-webdriver');
const {By, Builder} = webdriver;

var assert = require('assert');

(async function itemsToDoListDefault() {
    let driver = await new Builder().forBrowser('chrome').build();
    try {
        await driver.get('http://localhost:8080/');

        //verificar se existe dois itens por padrão
        let elements = await driver.findElements(By.css('.todo-list li'));
        
        for(let e of elements) {
            assert.ok(await e.getText(), 'Tomar café da manhã');
            assert.ok(await e.getText(), 'Passear com o cachorro');
        }

        assert.strictEqual(await elements.length, 2);
        
        //adicionar novo item
        let task = 'Estudar testes e2e';
        await driver.findElement(By.id('new-task')).sendKeys(task);  
        await driver.findElement(By.id('add-task-button')).click();   

        let newElements = await driver.findElements(By.css('.todo-list li'));

        assert.strictEqual(await newElements.length, 3);
        for(let e of newElements) {
            assert.ok(await e.getText(), 'Estudar testes e2e');
        }

        //tentar incluir tarefa sem texto
        let taskNull = '';
        await driver.findElement(By.id('new-task')).sendKeys(taskNull);  
        await driver.findElement(By.id('add-task-button')).click();   

        let nullElements = await driver.findElements(By.css('.todo-list li'));
        let textNullElement = await driver.findElement(By.css('.input-error p'));

        assert.strictEqual(await nullElements.length, 3);
        assert.ok(await textNullElement.getText(), 'Não há tarefa para incluir!');

        //poder checar um item concluído
        await driver.findElement(By.css('.checkmark')).click();
        assert.ok(await driver.findElement(By.css('.completed')));

        let taskCompleted = await driver.findElement(By.css('.completed'));
        let parentCheck = await taskCompleted.findElement(By.xpath("./.."));

        assert.ok(await parentCheck.getText(), 'Estudar testes e2e');

        //poder deletar uma task concluída
        
        await parentCheck.findElement(By.id('remove-task-button')).click();
        let qtdElements = await driver.findElements(By.css('.todo-list li'));
       
        assert.strictEqual(await qtdElements.length, 2);

    }
    catch (error) {
        console.log(error);
    }
    finally {
        await driver.quit();
    }   
})();