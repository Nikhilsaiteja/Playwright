1.LOCATORS
{
    Playwright locators{
        getByTestId
        getByRole
        getByLabel
        getByPlaceholder
        getByAltText
        getByTitle
        getByText
    }
    Attribute locators{
        locator('#id')
        locator('.class')
        locator([attribute='value'])
        locator('tag')
    }
    CSS locators{
        locator('#id.class')
        locator('tag#id.class')
        locator('tag[attribute="value"]')
    }
    xpath locators{
        relative xpath //tag[@attribute="value"]
                       //*[text()='value']
                       //tag[normalize-space()='value']
                       //*[contains(text(),'value')]
                       //tag[contains(@attribute,'value')]
                       //*[@attribute='value' and text()='value']
                       //*[@attribute='value' or text()='value']
        absolute xpath //html/body/div[1]/div[2]/div[1]/div[1]/div[1]/div[2]/div/div/div/div/div/div/div/div
    }
    pseudo locators{
        locator(':first-child')
        locator(':last-child')
        locator(':nth-child(n)')

        //tag[@attribute='value']/parent::tag
        //tag[@attribute='value']/ancestor::tag
        //tag[@attribute='value']/child::tag
        //tag[@attribute='value']/descendant::tag
        //tag[@attribute='value']/following-sibling::tag
        //tag[@attribute='value']/preceding-sibling::tag
    }
    filters{
        .filter({hasText:'value'})
        .first()
        .last()
        .nth(n)
    }

    Priority of locators:
        getByTestId
        locator('#id')
        getByRole, getByText ...etc
        relative xpath
}

2.ASSERTIONS{
    toHaveText
    toHaveValue
    toHaveCount
    toHaveURL
    toHaveTitle
    toBeVisible
    toBeHidden
    toBeEnabled
    toBeChecked
    toBeGreaterThanOrEqual
    toBeTruthy

    Hard: If assertion failed, test will be failed and execution also will be stopped.
    await expect(locator).toHaveCount(2);

    Soft: If assertion failed, test will be failed but execution will be continued.
    await expect.soft(locator).toHaveCount(2);
}

3.ACTIONS{
    click
    fill
    type
    press
    pressSequentially
    hover
    dblclick
    check
    selectOption
    setInputFiles
    dragTo
    scrollIntoViewIfNeeded
    keyboard.press (OS shortcuts won't work ex: Alt+F4, windows+printscreen etc)
}

4.SCROLLS,SLIDER & POPUPS{
    scrollIntoViewIfNeeded{
        await locator.scrollIntoViewIfNeeded();
    }
    mouse wheel{
        await page.mouse.wheel(0,40);
    }
    keyboard press{
        await page.keyboard.press('PageDown');
        await page.keyboard.press('ArrowDown');
    }
    window.scrollTo{
        await page.evaluate(()=>window.scrollTo(0,document.body.scrollHeight));
    }
    container scroll{
        await locator.evaluate((el)=>{
            el.scrollTop = el.scrollHeight
        });
    }
    Infinity scroll{
        let initialHeight = 0;
        let currentHeight = await page.evaluate(()=>document.body.scrollHeight);
        while(initialHeight !== currentHeight){
            initialHeight = currentHeight;
            await page.evaluate(()=>window.scrollTo(0,document.body.scrollHeight));
            currentHeight = await page.evaluate(()=>document.body.scrollHeight);
        }
    }

    SLIDER{
        fill{
            await slider.fill('4');
        }
        click{
            await slider.click({position:{x:40,y:0}});
        }
        keyboard press{
            await slider.press('ArrowRight');
        }
    }

    POPUPS{
        //Playwright automatically handles alerts, confirms and prompts. It will accept the alert by default. If you want to dismiss the alert, you can use page.on('dialog', dialog => dialog.dismiss()); before the action that triggers the alert.
        New tab or window{
            await Promise.all([
                page.waitForEvent('popup'),
                page.locator('selector').click()
            ])
            const childs = page.context().pages();
        }
        alert or dialog or confirm{
            page.on('dialog', async newDialog=>{
                await newDialog.accept();
                await newDialog.dismiss();
                expect(newDialog.defaultValue()).toBe('value');
            });
        }
        filechooser popup{
            const [fileChooser] = await Promise.all([
                page.waitForEvent('filechooser'),
                page.locator('selector').click()
            ])
            await fileChooser.setFiles('path/to/file');
        }
        context permissions{
            const context = await browser.newContext({
                permissions: ['geolocation'],
                httpCredentials: {
                    username: 'username',
                    password: 'password'
                }
            });
            const page = await context.newPage();
            await page.goto('https://example.com');
        }
    }
}