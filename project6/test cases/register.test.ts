import {expect, test} from "playwright/test";


test.describe("register page test case",()=>{

test.beforeEach(async({page})=>{
await page.goto("http://localhost:5173/register")
})

test("should show  alert if any field is empty",async({page})=>{
page.once("dialog",async dialog=>{
     expect(dialog.message()).toBe("fill up all the fields")
     await dialog.accept();
})
await page.getByRole("button",{name:"Register"}).click();
})

test("should successfully register the user and navigate the page",async({page})=>{
    await page.route("**/apis/",async route=>{
        await route.fulfill({
            status:200,
            contentType:"application/json",
            body:JSON.stringify({success:true})
        })
    })
    page.once("dialog",async dialog=>{
    expect(dialog.message()).toBe("user registered succesfully")
    await dialog.accept()
})

await page.getByPlaceholder('Name').fill("Tejas")
await page.getByPlaceholder('Email').fill("T@gmail.com")
await page.getByPlaceholder('Password').fill("12345")

await page.getByRole("button",{name:"Register"}).click()
await expect(page).toHaveURL("http://localhost:5173")
})


test("should show failure when backend sends false",async({page})=>{

    await page.route("http://localhost:3000/apis/",async route=>{
        await route.fulfill({
            status:200,
            contentType:"application/json",
            body:JSON.stringify({success:false})
        })
    })
    page.once("dialog",dilog=>{
        expect(dilog.message()).toBe("registration failed")
        dilog.accept()
    })
await page.getByPlaceholder("Name").fill("Tejas")
await page.getByPlaceholder("Email").fill("t@gmail.com")
await page.getByPlaceholder("Password").fill("12345")

await page.getByRole("button",{name:"Register"}).click()

await expect(page).toHaveURL("http://localhost:5173/register")

})

})