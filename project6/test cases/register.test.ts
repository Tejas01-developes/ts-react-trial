import {expect, test} from "playwright/test";


test.describe("register page test case",()=>{

test.beforeEach(({page})=>{
page.goto("http://localhost:5173/register")
})

test("should show  alert if any field is empty",async({page})=>{
page.once("dialog",dialog=>{
    expect(dialog.message()).toBe("fill up all the fields")
}) 
await page.getByRole("button",{name:"Register"}).click();
})

test("should successfully register the user and navigate the page",async({page})=>{
    await page.route("http://localhost:3000/apis/",async route=>{
        await route.fulfill({
            status:200,
            contentType:"application/json",
            body:JSON.stringify({success:true})
        })
    })
page.once("dialog",dialog=>{
    expect(dialog.message).toBe("user registerd succesfully")
    dialog.accept
})

await page.getByPlaceholder('Name').fill("Tejas")
await page.getByPlaceholder('Email').fill("T@gmail.com")
await page.getByPlaceholder('Password').fill("12345")

await page.getByRole("button",{name:"Register"}).click()
await expect(page).toHaveURL("http://localhost:5173")
})


test("should show failurwe when backend sends false",()=>{
    
})

})