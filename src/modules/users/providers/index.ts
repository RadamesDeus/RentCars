import BCryptHashPassword from "@modules/users/providers/HashPassword/implements/BCryptHashPassword";
import { container } from "tsyringe";

import IHashPassword from "./HashPassword/IHashPassword";

container.registerSingleton<IHashPassword>("HashPassword", BCryptHashPassword);
