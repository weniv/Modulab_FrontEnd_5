import { Licat } from "./components/Licat";
import { Time } from "./components/Time";


function Component() {
    return (
        <div>
            <Licat name="gary" age={35} />
            <Time />
        </div>
    );
}

export default Component;