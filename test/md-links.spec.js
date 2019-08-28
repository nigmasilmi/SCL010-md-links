const mdLinksTest = require('./../index');

test('mdLinksTest (mdLinks) must be a function', ()=>{
    expect(mdLinksTest).toBeDefined();
});

test('mdLinks must see the arguments passed', ()=>{
    const comingPath = './';
    const comingOptions = '{validate:true}';
    const mdLinksWithArgs = mdLinksTest(comingPath, comingOptions);
    expect(mdLinksWithArgs.toBeDefined());
});
