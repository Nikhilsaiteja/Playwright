import { test, expect, Page } from '@playwright/test';

test.skip('checking select dropdown functionality', async ({page})=>{
    await page.goto('https://testautomationpractice.blogspot.com/');
    await page.waitForLoadState('networkidle');
    const countryDropdown = page.locator('#country');
    await countryDropdown.scrollIntoViewIfNeeded();
    // await countryDropdown.selectOption('India');
    await countryDropdown.selectOption({index: 1});
    await page.waitForTimeout(2000);
    await expect(countryDropdown).toHaveValue('canada');
});

test.skip('checking bootstrap dropdown functionality', async ({page})=>{
    await page.goto('https://www.automationtestinginsider.com/2019/12/bootstrap-dropdown-example_12.html');
    await page.waitForLoadState('networkidle');
    const dropdownButton = page.locator('#bootstrapmenu');
    await dropdownButton.scrollIntoViewIfNeeded();
    await dropdownButton.click();
    await page.waitForTimeout(2000);
    await page.locator('a').filter({hasText:'HOME'}).nth(1).click();
    await page.waitForTimeout(2000);
    await expect(page.locator('#Header1_headerimg')).toBeVisible();
});

test.skip('upload functionality',async ({page})=>{
    await page.goto('https://testautomationpractice.blogspot.com/');
    await page.waitForLoadState('networkidle');
    const uploadBtn = page.locator('#singleFileInput');
    await uploadBtn.scrollIntoViewIfNeeded();
    await page.waitForTimeout(2000);
    await uploadBtn.setInputFiles(["C:\\Users\\nikhi\\OneDrive\\Pictures\\Screenshots\\Screenshot (19).png"]);
    await page.waitForTimeout(3000);
    await uploadBtn.setInputFiles([]);
    await page.waitForTimeout(2000);
});

test.skip('multi upload functionality',async ({page})=>{
    await page.goto('https://testautomationpractice.blogspot.com/');
    await page.waitForLoadState('networkidle');
    const uploadBtn = page.locator('#multipleFilesInput');
    await uploadBtn.scrollIntoViewIfNeeded();
    await page.waitForTimeout(2000);
    await uploadBtn.setInputFiles(["C:\\Users\\nikhi\\OneDrive\\Pictures\\Screenshots\\Screenshot (19).png","C:\\Users\\nikhi\\OneDrive\\Pictures\\Screenshots\\Screenshot (10).png"]);
    await page.waitForTimeout(3000);
    await uploadBtn.setInputFiles([]);
    await page.waitForTimeout(2000);
});

test.skip('drag and drop', async ({page})=>{
    await page.goto('https://testautomationpractice.blogspot.com/');
    await page.waitForLoadState('networkidle');
    const source = page.locator('div#draggable');
    const target = page.locator('div#droppable');
    await target.scrollIntoViewIfNeeded();
    await page.waitForTimeout(2000);
    await source.dragTo(target);
    await page.waitForTimeout(2000);
});

test.skip('mouse hover & double click', async ({page})=>{
    await page.goto('https://testautomationpractice.blogspot.com/');
    await page.waitForLoadState('networkidle');
    const dropbtn = page.locator('.dropbtn');
    await dropbtn.scrollIntoViewIfNeeded();
    await page.waitForTimeout(2000);
    await dropbtn.hover();
    await page.waitForTimeout(2000);
    await page.getByRole('link', {name: 'Laptops'}).click();
    await page.waitForTimeout(2000);
    const dblBtn = page.locator('button').filter({hasText: 'Copy Text'});
    await dblBtn.scrollIntoViewIfNeeded();
    await page.waitForTimeout(2000);
    await dblBtn.dblclick();
    await page.waitForTimeout(2000);
});

test.skip('keyboard actions',async ({page})=>{
    test.setTimeout(60000);
    await page.goto("https://practice.expandtesting.com/key-presses");
    await page.waitForLoadState('networkidle');
    const inputField = page.locator('#target');
    await inputField.scrollIntoViewIfNeeded();
    await page.waitForTimeout(2000);
    await inputField.click();
    await page.keyboard.press('Tab');
    await inputField.click();
    await page.keyboard.press('Enter');
    await page.waitForTimeout(1000);
    await page.keyboard.press('ArrowLeft');
    await page.waitForTimeout(1000);
    await page.keyboard.press('Delete');
    await page.waitForTimeout(1000);
    await inputField.click();
    await page.keyboard.press('Backspace');
    await inputField.click();
    await page.waitForTimeout(1000);
    await page.keyboard.press('ArrowRight');
    await page.waitForTimeout(1000);
    await inputField.click();
    await page.keyboard.press('ArrowUp');
    await page.waitForTimeout(1000);
    await page.keyboard.press('Shift');
    await inputField.click();
    await page.waitForTimeout(1000);
    await page.keyboard.press('k');
});

test.skip('scrollIntoViewIfNeeded', async ({page})=>{
    await page.goto('https://the-internet.herokuapp.com/large');
    await page.waitForLoadState('networkidle');
    await page.locator('td').filter({hasText:"22.26"}).scrollIntoViewIfNeeded();
    await page.waitForTimeout(2000);
});

test.skip('mouse wheel',async({page})=>{
    await page.goto('https://the-internet.herokuapp.com/large');
    await page.waitForLoadState('networkidle');
    await page.mouse.wheel(500, 500);
    await page.waitForTimeout(2000);
});

test.skip('keyboard press scroll',async({page})=>{
    await page.goto('https://the-internet.herokuapp.com/large');
    await page.waitForLoadState('networkidle');
    await page.keyboard.press('PageDown');
    await page.waitForTimeout(4000);
});

test.skip('window.scrollTo',async({page})=>{
    await page.goto('https://the-internet.herokuapp.com/large');
    await page.waitForLoadState('networkidle');
    const Height = await page.evaluate(()=>document.body.scrollHeight);
    console.log("Height of the page is: "+Height);
    await page.evaluate(()=>window.scrollTo(500,document.body.scrollHeight));
    await page.waitForTimeout(4000);
});

test.skip('container scroll',async({page})=>{
    await page.goto('https://practice.expandtesting.com/scrollbars');
    await page.waitForLoadState('networkidle');
    const container = await page.locator("//div[@class='col-md-9']//div//div//div");
    await page.getByRole('heading', { name: 'Playground' }).scrollIntoViewIfNeeded();
    await page.waitForTimeout(2000);
    await page.waitForTimeout(2000);
    await container.evaluate((el)=>{
        el.scrollTop = el.scrollHeight;
    });
    await page.waitForTimeout(4000);
});

test.skip('Infinite scroll', async ({page})=>{
    await page.goto('https://the-internet.herokuapp.com/infinite_scroll');
    await page.waitForLoadState('networkidle');

    let initialHeight = 0;

    for(let i=0;i<5;i++){
        let currentHeight = await page.evaluate(()=>document.body.scrollHeight);
        await page.waitForTimeout(2000);
        if(initialHeight === currentHeight){
            break;
        }
        initialHeight = currentHeight;
        await page.evaluate(()=>window.scrollTo(0,document.body.scrollHeight));
        await page.waitForTimeout(2000);
    }
});

test.skip('slider functionality', async ({page})=>{
    await page.goto('https://the-internet.herokuapp.com/horizontal_slider');
    await page.waitForLoadState('networkidle');
    const slider = page.locator('input[type$="ge"]');
    //await slider.fill('4');
    //await slider.click({position:{x:0,y:0}});
    await slider.press('ArrowRight');
    await page.waitForTimeout(2000);
});

test.skip('Handling dialogs',async({page})=>{
    await page.goto('https://testautomationpractice.blogspot.com/');
    await page.waitForLoadState('networkidle');
    // let alertBtn = page.locator('#alertBtn');
    // let alertBtn = page.locator('#confirmBtn');
    let alertBtn = page.locator('#promptBtn');
    await alertBtn.scrollIntoViewIfNeeded();
    await page.waitForTimeout(2000);
    page.on('dialog', async newDialog=>{
        expect(newDialog.defaultValue()).toBe('Harry Potter');
        await newDialog.accept('ABCD');
    });
    await alertBtn.click();
    await page.waitForTimeout(4000);
});

test.skip('Handling new tab/window',async({page})=>{
    await page.goto('https://testautomationpractice.blogspot.com/');
    await page.waitForLoadState('networkidle');
    const newTabBtn = page.getByText('New Tab');
    await newTabBtn.scrollIntoViewIfNeeded();
    await page.waitForTimeout(2000);
    const [page1] = await Promise.all([
        page.waitForEvent('popup'),
        newTabBtn.click()
    ]);
    await page1.waitForLoadState('networkidle');
    console.log(`New tab title: ${await page1.title()}`);
    await page1.waitForTimeout(2000);
});

test.skip('Handling new popups',async({page})=>{
    await page.goto('https://testautomationpractice.blogspot.com/');
    await page.waitForLoadState('networkidle');
    const newPopupBtn = page.getByText('Popup Windows');
    await newPopupBtn.scrollIntoViewIfNeeded();
    await page.waitForTimeout(2000);
    await Promise.all([
        page.waitForEvent('popup'),
        newPopupBtn.click()
    ]);
    await page.waitForTimeout(4000);
    const pages = page.context().pages();
    console.log(`Total number of pages: ${pages.length}`);
    console.log(`New popup title: ${await pages[0].title()}`);
    console.log(`New popup title: ${await pages[1].title()}`);
    console.log(`New popup title: ${await pages[2].title()}`);
    await page.waitForTimeout(2000);
});

test.skip('Handling file chooser popup',async({page})=>{
    await page.goto('https://example.com/upload');

    const [filetoUpload] = await Promise.all([
        page.waitForEvent('filechooser'),
        page.click('#uploadButton')
    ]);
    await filetoUpload.setFiles(["C:\\Users\\nikhi\\OneDrive\\Pictures\\Screenshots\\Screenshot (19).png"]);
});

test.skip('permissions popup', async({browser})=>{
    //await page.context().grantPermissions(['geolocation']); if using page fixture
    const context = await browser.newContext({
        permissions: ['geolocation']
    });
    const page = await context.newPage();
    await page.goto('https://maps.google.com');
    await page.waitForLoadState();
    await page.waitForTimeout(2000);
    await page.getByText('').click();
    await page.waitForTimeout(5000);
});

test.skip('basic auth popup',async({browser})=>{
    //await page.goto('https://admin:admin@the-internet.herokuapp.com/basic_auth'); directly passing username and password in the URL
    const context = await browser.newContext({
        httpCredentials: {
            username: 'admin',
            password: 'admin'
        }
    });
    const page = await context.newPage();
    await page.goto('https://the-internet.herokuapp.com/basic_auth');
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(2000);
});

test.only('handling Iframes',async({page})=>{
    await page.goto('https://ui.vision/demo/webtest/frames/');
    await page.waitForLoadState('networkidle');
    const frame5 = page.frame({url: 'https://ui.vision/demo/webtest/frames/frame_5'});
    if(frame5){
        const textField = await frame5.locator('[name="mytext5"]');
        await textField.fill('Hello from frame 5');
        await page.waitForTimeout(2000);

        const childLink = await frame5.locator('a[href$="https://a9t9.com"]');
        await childLink.click();
        await page.waitForTimeout(4000);

        const logo = await frame5.locator('//img[@alt="Ui.Vision by a9t9 software - Image-Driven Automation"]');
        await expect(logo).toBeVisible();

        const childs = frame5.childFrames();
        console.log(`Total number of child frames: ${childs.length}`);
        if(childs.length > 0){
            // const childFrame = childs[1];
            // const childLogo = await childFrame.locator('//img[@alt="Ui.Vision by a9t9 software - Image-Driven Automation"]');
            // await expect(childLogo).toBeVisible();
            // await page.waitForTimeout(2000);
            console.log(`Child frame URL: ${childs[0].url()}`);
        }
    }else{
        console.log('Frame not found');
    }
});