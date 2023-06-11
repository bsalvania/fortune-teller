import { BASE } from "./consts.js";

describe("Basic user flow for Website", () => {
  // First, visit the fortune cookie website
  beforeAll(async () => {
    await page.goto(`${BASE}/source/FortuneCookie/`);
  });

  // Check to make sure that fortune button is enabled when page loads
  it("Make sure fortune button is enabled on page load", async () => {
    console.log("Checking to make sure fortune button is enabled...");
    let fortuneButtonDisabled;
    const fortuneButton = await page.$("#fortune-button");

    let booleanValue = await fortuneButton.getProperty("disabled");
    fortuneButtonDisabled = await booleanValue.jsonValue();
    expect(fortuneButtonDisabled).toBe(false);
  }, 5000);

  // Check to make sure that cookie button is enabled when page loads
  it("Make sure cookie button is enabled on page load", async () => {
    console.log("Checking to make sure cookie button is enabled...");
    let cookieButtonDisabled;
    const cookieButton = await page.$("#cookie-button");

    let booleanValue = await cookieButton.getProperty("disabled");
    cookieButtonDisabled = await booleanValue.jsonValue();
    expect(cookieButtonDisabled).toBe(false);
  }, 5000);

  // Check to make sure that reset button is disabled when page loads
  it("Make sure reset button is disabled on page load", async () => {
    console.log("Checking to make sure reset button is disabled...");
    let resetButtonDisabled;
    const resetButton = await page.$("#reset-button");

    let booleanValue = await resetButton.getProperty("disabled");
    resetButtonDisabled = await booleanValue.jsonValue();
    expect(resetButtonDisabled).toBe(true);
  }, 5000);

  // Check to make sure that cancel button is not visible and has correct classes when page loads
  it("Make sure cancel button is not visible and has correct classes on page load", async () => {
    console.log(
      "Checking to make sure cancel button is not visible and has correct classes..."
    );

    // Only get past here if cancel button is not visible
    await page.waitForSelector("#cancel-animation-btn", { visible: false });

    // cancel button should not have animating class (only when fortune/cookie button is clicked)
    let elementHasClass = await page.evaluate(() => {
      const cancelButton = document.querySelector("#cancel-animation-btn");
      return cancelButton.parentElement.classList.contains("animating");
    });
    expect(elementHasClass).toBe(false);

    // cancel button should have cancel-animation-wrapper class (only when reset button is clicked)
    elementHasClass = await page.evaluate(() => {
      const cancelButton = document.querySelector("#cancel-animation-btn");
      return cancelButton.classList.contains("animating-new-cookie");
    });
    expect(elementHasClass).toBe(false);
  }, 5000);

  // Test all buttons when the fortune button is clicked

  // Check to make sure that fortune button disables when it is clicked
  it("Make sure fortune button disables after being clicked", async () => {
    console.log(
      "Checking to make sure fortune button disables when clicked..."
    );

    let fortuneButtonDisabled;
    const fortuneButton = await page.$("#fortune-button");
    await fortuneButton.click();

    let booleanValue = await fortuneButton.getProperty("disabled");
    fortuneButtonDisabled = await booleanValue.jsonValue();
    expect(fortuneButtonDisabled).toBe(true);
  }, 5000);

  // Check to make sure that cookie button also disables when the fortune button is clicked
  it("Make sure cookie button disables after the fortune button is clicked", async () => {
    console.log(
      "Checking to make sure cookie button disables when fortune button is clicked..."
    );

    let cookieButtonDisabled;
    const cookieButton = await page.$("#cookie-button");

    let booleanValue = await cookieButton.getProperty("disabled");
    cookieButtonDisabled = await booleanValue.jsonValue();
    expect(cookieButtonDisabled).toBe(true);
  }, 5000);

  // Check to make sure that cancel button becomes visible and has correct classes after fortune button is clicked
  it("Make sure cancel button is visible and has correct classes when fortune button is clicked", async () => {
    console.log(
      "Checking to make sure cancel button is visible and has correct classes when fortune button is clicked..."
    );

    // Only get past here if cancel button is visible
    await page.waitForSelector("#cancel-animation-btn", { visible: true });

    // cancel button should have animating class
    let elementHasClass = await page.evaluate(() => {
      const cancelButton = document.querySelector("#cancel-animation-btn");
      return cancelButton.parentElement.classList.contains("animating");
    });
    expect(elementHasClass).toBe(true);

    // cancel button should not have cancel-animation-wrapper class
    elementHasClass = await page.evaluate(() => {
      const cancelButton = document.querySelector("#cancel-animation-btn");
      return cancelButton.parentElement.classList.contains(
        "animating-new-cookie"
      );
    });
    expect(elementHasClass).toBe(false);
  }, 5000);

  // Check to make sure that reset button is enabled when after fortune button is clicked
  it("Make sure reset button is enabled after fortune button is clicked", async () => {
    console.log("Checking to make sure reset button is enabled...");

    /**
     * The waitForFunction() waits for the provided function to return true, indicating that the button element with the ID 'reset-button'
     * has its disabled attribute set to false. If the button's disabled value becomes false within the specified timeout, the test will pass.
     */
    await page.waitForFunction(() => {
      const resetButton = document.querySelector("#reset-button");
      return resetButton && resetButton.disabled === false;
    });

    // Makes sure the reset button is actually enabled
    let resetButtonDisabled;
    const resetButton = await page.$("#reset-button");
    let booleanValue = await resetButton.getProperty("disabled");
    resetButtonDisabled = await booleanValue.jsonValue();
    expect(resetButtonDisabled).toBe(false);
  }, 25000);

  // Make sure fortune paper is revealed by the time reset button appears
  it("Make sure fortune paper is revealed after fortune button is clicked", async () => {
    console.log(
      "Checking to make sure fortune button is revealed after fortune button is clicked..."
    );

    let elementHasClass = await page.evaluate(() => {
      const fortunePaper = document.querySelector("#fortune-paper");
      return fortunePaper.classList.contains("reveal");
    });
    expect(elementHasClass).toBe(true);
  }, 5000);

  // Check to make sure that cancel button is not visible and has correct classes when reset button appears
  it("Make sure cancel button is not visible and has correct classes when reset button appears", async () => {
    console.log(
      "Checking to make sure cancel button is not visible and has correct classes when reset button appears..."
    );

    // Only get past here if cancel button is not visible
    await page.waitForSelector("#cancel-animation-btn", { visible: false });

    // cancel button should not have animating class
    let elementHasClass = await page.evaluate(() => {
      const cancelButton = document.querySelector("#cancel-animation-btn");
      return cancelButton.parentElement.classList.contains("animating");
    });
    expect(elementHasClass).toBe(false);

    // cancel button should not have cancel-animation-wrapper class
    elementHasClass = await page.evaluate(() => {
      const cancelButton = document.querySelector("#cancel-animation-btn");
      return cancelButton.parentElement.classList.contains(
        "animating-new-cookie"
      );
    });
    expect(elementHasClass).toBe(false);
  }, 5000);

  // Check to make sure that reset button gets disabled when the reset button is clicked
  it("Make sure after reset button is clicked, reset button is disabled", async () => {
    console.log(
      "Checking to make sure reset button is disabled after the reset button is clicked ..."
    );

    // Click reset button
    let resetButtonDisabled;
    const resetButton = await page.$("#reset-button");
    await resetButton.click();

    // Check that reset button is now disabled
    let booleanValue = await resetButton.getProperty("disabled");
    resetButtonDisabled = await booleanValue.jsonValue();
    expect(resetButtonDisabled).toBe(true);
  }, 5000);

  // Check to make sure that cancel button becomes visible and has correct classes after reset button is clicked
  it("Make sure cancel button is visible and has correct classes when reset button is clicked", async () => {
    console.log(
      "Checking to make sure cancel button is visible and has correct classes when reset button is clicked..."
    );

    // Only get past here if cancel button is visible
    await page.waitForSelector("#cancel-animation-btn", { visible: true });

    // cancel button should have animating class
    let elementHasClass = await page.evaluate(() => {
      const cancelButton = document.querySelector("#cancel-animation-btn");
      return cancelButton.parentElement.classList.contains("animating");
    });
    expect(elementHasClass).toBe(true);

    // cancel button should have cancel-animation-wrapper class
    elementHasClass = await page.evaluate(() => {
      const cancelButton = document.querySelector("#cancel-animation-btn");
      return cancelButton.parentElement.classList.contains(
        "animating-new-cookie"
      );
    });
    expect(elementHasClass).toBe(true);
  }, 5000);

  // Now that reset button has been clicked, check that the fortune button is enabled
  it("Make sure that after the reset button is clicked, the fortune button is reenabled", async () => {
    console.log(
      "Checking to make sure fortune button is reenabled after the reset button has been clicked ..."
    );

    /**
     * The waitForFunction() waits for the provided function to return true, indicating that the button element with the ID 'fortune-button'
     * has its disabled attribute set to false. If the button's disabled value becomes false within the specified timeout, the test will pass.
     */
    await page.waitForFunction(() => {
      const fortuneButton = document.querySelector("#fortune-button");
      return fortuneButton && fortuneButton.disabled === false;
    });

    // Check that fortune button is now enabled
    let fortuneButtonDisabled;
    const fortuneButton = await page.$("#fortune-button");
    let booleanValue = await fortuneButton.getProperty("disabled");
    fortuneButtonDisabled = await booleanValue.jsonValue();
    expect(fortuneButtonDisabled).toBe(false);
  }, 10000);

  // Now that reset button has been clicked, check that the cookie button is enabled
  it("Make sure after reset button is clicked, the cookie button is reenabled", async () => {
    console.log(
      "Checking to make sure cookie button is reenabled after the reset button has been clicked ..."
    );

    /**
     * The waitForFunction() waits for the provided function to return true, indicating that the button element with the ID 'cookie-button'
     * has its disabled attribute set to false. If the button's disabled value becomes false within the specified timeout, the test will pass.
     */
    await page.waitForFunction(() => {
      const cookieButton = document.querySelector("#cookie-button");
      return cookieButton && cookieButton.disabled === false;
    });

    // Check that cookie button is now enabled
    let cookieButtonDisabled;
    const cookieButton = await page.$("#cookie-button");
    let booleanValue = await cookieButton.getProperty("disabled");
    cookieButtonDisabled = await booleanValue.jsonValue();
    expect(cookieButtonDisabled).toBe(false);
  }, 5000);

  // Check to make sure that cancel button becomes not visible and has correct classes after fortune/cookie button are enabled
  it("Make sure cancel button is not visible and has correct classes after fortune/cookie button are enabled", async () => {
    console.log(
      "Checking to make sure cancel button is visible and has correct classes after fortune/cookie button are enabled..."
    );

    // Only get past here if cancel button is visible
    await page.waitForSelector("#cancel-animation-btn", { visible: false });

    // cancel button should not have animating class
    let elementHasClass = await page.evaluate(() => {
      const cancelButton = document.querySelector("#cancel-animation-btn");
      return cancelButton.parentElement.classList.contains("animating");
    });
    expect(elementHasClass).toBe(false);

    // cancel button should have cancel-animation-wrapper class
    elementHasClass = await page.evaluate(() => {
      const cancelButton = document.querySelector("#cancel-animation-btn");
      return cancelButton.parentElement.classList.contains(
        "animating-new-cookie"
      );
    });
    expect(elementHasClass).toBe(true);
  }, 5000);

  // Now test all buttons when the cookie button is clicked

  // Check to make sure that cookie button disables when it is clicked
  it("Make sure cookie button disables after being clicked", async () => {
    console.log("Checking to make sure cookie button disables when clicked...");

    let cookieButtonDisabled;
    const cookieButton = await page.$("#cookie-button");
    await cookieButton.click();

    let booleanValue = await cookieButton.getProperty("disabled");
    cookieButtonDisabled = await booleanValue.jsonValue();
    expect(cookieButtonDisabled).toBe(true);
  }, 5000);

  // Check to make sure that fortune button also disables when the cookie button is clicked
  it("Make sure fortune button disables after the cookie button is clicked", async () => {
    console.log(
      "Checking to make sure fortune button disables when cookie button is clicked..."
    );

    let fortuneButtonDisabled;
    const fortuneButton = await page.$("#fortune-button");

    let booleanValue = await fortuneButton.getProperty("disabled");
    fortuneButtonDisabled = await booleanValue.jsonValue();
    expect(fortuneButtonDisabled).toBe(true);
  }, 5000);

  // Check to make sure that cancel button becomes visible and has correct classes after cookie button is clicked
  it("Make sure cancel button is visible and has correct classes when cookie button is clicked", async () => {
    console.log(
      "Checking to make sure cancel button is visible and has correct classes when cookie button is clicked..."
    );

    // Only get past here if cancel button is visible
    await page.waitForSelector("#cancel-animation-btn", { visible: true });

    // cancel button should have animating class
    let elementHasClass = await page.evaluate(() => {
      const cancelButton = document.querySelector("#cancel-animation-btn");
      return cancelButton.parentElement.classList.contains("animating");
    });
    expect(elementHasClass).toBe(true);

    // cancel button should not have cancel-animation-wrapper class
    elementHasClass = await page.evaluate(() => {
      const cancelButton = document.querySelector("#cancel-animation-btn");
      return cancelButton.parentElement.classList.contains(
        "animating-new-cookie"
      );
    });
    expect(elementHasClass).toBe(false);
  }, 5000);

  // Check to make sure that reset button is enabled when after cookie button is clicked
  it("Make sure reset button is enabled after cookie button is clicked", async () => {
    console.log(
      "Checking to make sure reset button is enabled after cookie button is clicked..."
    );

    /**
     * The waitForFunction() waits for the provided function to return true, indicating that the button element with the ID 'reset-button'
     * has its disabled attribute set to false. If the button's disabled value becomes false within the specified timeout, the test will pass.
     */
    await page.waitForFunction(() => {
      const resetButton = document.querySelector("#reset-button");
      return resetButton && resetButton.disabled === false;
    });

    // Makes sure the reset button is actually enabled
    let resetButtonDisabled;
    const resetButton = await page.$("#reset-button");
    let booleanValue = await resetButton.getProperty("disabled");
    resetButtonDisabled = await booleanValue.jsonValue();
    expect(resetButtonDisabled).toBe(false);
  }, 25000);

  // Check to make sure that reset button gets disabled when the reset button is clicked
  it("Make sure after reset button is clicked, reset button is disabled", async () => {
    console.log(
      "Checking to make sure reset button is disabled after the reset button is clicked ..."
    );

    // Click reset button
    let resetButtonDisabled;
    const resetButton = await page.$("#reset-button");
    await resetButton.click();

    // Check that reset button is now disabled
    let booleanValue = await resetButton.getProperty("disabled");
    resetButtonDisabled = await booleanValue.jsonValue();
    expect(resetButtonDisabled).toBe(true);
  }, 5000);

  // Check to make sure that cancel button becomes visible and has correct classes after reset button is clicked
  it("Make sure cancel button is visible and has correct classes when reset button is clicked", async () => {
    console.log(
      "Checking to make sure cancel button is visible and has correct classes when reset button is clicked..."
    );

    // Only get past here if cancel button is visible
    await page.waitForSelector("#cancel-animation-btn", { visible: true });

    // cancel button should have animating class
    let elementHasClass = await page.evaluate(() => {
      const cancelButton = document.querySelector("#cancel-animation-btn");
      return cancelButton.parentElement.classList.contains("animating");
    });
    expect(elementHasClass).toBe(true);

    // cancel button should have cancel-animation-wrapper class
    elementHasClass = await page.evaluate(() => {
      const cancelButton = document.querySelector("#cancel-animation-btn");
      return cancelButton.parentElement.classList.contains(
        "animating-new-cookie"
      );
    });
    expect(elementHasClass).toBe(true);
  }, 5000);

  // Now that reset button has been clicked, check that the fortune button is enabled
  it("Make sure that after the reset button is clicked, the fortune button is reenabled", async () => {
    console.log(
      "Checking to make sure fortune button is reenabled after the reset button has been clicked ..."
    );

    /**
     * The waitForFunction() waits for the provided function to return true, indicating that the button element with the ID 'fortune-button'
     * has its disabled attribute set to false. If the button's disabled value becomes false within the specified timeout, the test will pass.
     */
    await page.waitForFunction(() => {
      const fortuneButton = document.querySelector("#fortune-button");
      return fortuneButton && fortuneButton.disabled === false;
    });

    // Check that fortune button is now enabled
    let fortuneButtonDisabled;
    const fortuneButton = await page.$("#fortune-button");
    let booleanValue = await fortuneButton.getProperty("disabled");
    fortuneButtonDisabled = await booleanValue.jsonValue();
    expect(fortuneButtonDisabled).toBe(false);
  }, 10000);

  // Now that reset button has been clicked, check that the cookie button is enabled
  it("Make sure after reset button is clicked, the cookie button is reenabled", async () => {
    console.log(
      "Checking to make sure cookie button is reenabled after the reset button has been clicked ..."
    );

    /**
     * The waitForFunction() waits for the provided function to return true, indicating that the button element with the ID 'cookie-button'
     * has its disabled attribute set to false. If the button's disabled value becomes false within the specified timeout, the test will pass.
     */
    await page.waitForFunction(() => {
      const cookieButton = document.querySelector("#cookie-button");
      return cookieButton && cookieButton.disabled === false;
    });

    // Check that cookie button is now enabled
    let cookieButtonDisabled;
    const cookieButton = await page.$("#cookie-button");
    let booleanValue = await cookieButton.getProperty("disabled");
    cookieButtonDisabled = await booleanValue.jsonValue();
    expect(cookieButtonDisabled).toBe(false);
  }, 5000);

  // Check to make sure that cancel button is not visible and has correct classes after fortune/cookie button are enabled
  it("Make sure cancel button is not visible and has correct classes after fortune/cookie button are enabled", async () => {
    console.log(
      "Checking to make sure cancel button is visible and has correct classes after fortune/cookie button are enabled..."
    );

    // Only get past here if cancel button is visible
    await page.waitForSelector("#cancel-animation-btn", { visible: false });

    // cancel button should not have animating class
    let elementHasClass = await page.evaluate(() => {
      const cancelButton = document.querySelector("#cancel-animation-btn");
      return cancelButton.parentElement.classList.contains("animating");
    });
    expect(elementHasClass).toBe(false);

    // cancel button should have cancel-animation-wrapper class
    elementHasClass = await page.evaluate(() => {
      const cancelButton = document.querySelector("#cancel-animation-btn");
      return cancelButton.parentElement.classList.contains(
        "animating-new-cookie"
      );
    });
    expect(elementHasClass).toBe(true);
  }, 5000);

  // Check to make sure that the speech synthesis is being populated, the correct voices are called by the function
  // describe("populateVoice", () => {
  //   test("populate voice options", () => {
  //     const voices = [
  //       { name: "Karen", lang: "en-AU", default: false },
  //       { name: "Eddy", lang: "pt-BR", default: false },
  //       { name: "Lesya", lang: "uk-UA", default: false },
  //     ];
  //     const synthesis = {
  //       getVoices: jest.fn().mockReturnValue(voices),
  //     };
  //     //const option = document.createElement('option');
  //     const appendchild = jest.spyOn(voiceSelect, "appendChild");
  //     //document.body.innerHTML=
  //     //<select></select>;
  //     populateVoiceList();
  //     expect(synthesis.getVoices).toHaveBeenCalled();
  //     expect(appendchild).toHaveBeenCalledTimes(3);
  //     //expect(voiceSelect.innerHTML).toContain('Karen');
  //   });
  // });
});
