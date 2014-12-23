/**
 * Created by skuma004 on 12/5/14.
 */
var scope = 'anything';

function f(){

    console.log(scope);

    var scope  = 'local';
    console.log(scope);
}

f();