import {expect, test} from '@playwright/test'


test.describe("login page test case",()=>{

   test.beforeEach(async({page})=>{
await page.goto("http://localhost:5173/")

   })

   test("see if any field is not empty",async({page})=>{
page.once("dialog",async dialog=>{
    expect(dialog.message()).toBe("fill up all the fields")
    await dialog.accept()
})
await page.getByRole("button",{name:"Login"}).click()

   })

test("should succesfuly login",async({page})=>{
  
await page.route("**/apis/login",async route=>{
   route.fulfill({
      status:200,
      contentType:"application/json",
      body:JSON.stringify({suceess:true})
   })
   page.once("dialog",async dialog=>{
      expect(dialog.message()).toBe("user login succesfully")
      await dialog.accept()
    })
await page.getByPlaceholder("Email").fill("t@gmail")
await page.getByPlaceholder("Password").fill("12345")

await page.getByRole("button",{name:"Login"}).click()

  await expect(page).toHaveURL("http://localhost:5173/home")
})

})

test("should send the token",async({page})=>{
  
   await page.route("**/apis/login",async route=>{
      route.fulfill({
         status:200,
         contentType:"application/json",
         body:JSON.stringify({suceess:true})
      })
      const requestpromise=page.waitForRequest(request=>{
         request.url().includes("**/apis/log") &&
         request.headers()["authorization"] === "Bearer fake_access_token"
      })


      page.once("dialog",async dialog=>{
         expect(dialog.message()).toBe("user login succesfully")
         await dialog.accept()
       })
   await page.getByPlaceholder("Email").fill("t@gmail")
   await page.getByPlaceholder("Password").fill("12345")
   
   await page.getByRole("button",{name:"Login"}).click()
   await requestpromise;
     await expect(page).toHaveURL("http://localhost:5173/home")
   })
   
   })



test("should not login",async({page})=>{
 
await page.route("**/apis/login",async route=>{
  route.fulfill({
     status:200,
     contentType:"application/json",
     body:JSON.stringify({suceess:false})
  })
  page.once("dialog",async dialog=>{
   expect(dialog.message()).toBe("login failed")
   await dialog.accept()
 })
 await page.getByPlaceholder("Email").fill("t@gmail")
await page.getByPlaceholder("Password").fill("12345")

await page.getByRole("button",{name:"Login"}).click()

 await expect(page).toHaveURL("http://localhost:5173/")
})

})

})