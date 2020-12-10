# Package

version       = "0.1.0"
author        = "Busk"
description   = "Frontend for variant-browser. Based on https://github.com/ThomasTJdev/nim_tutorials/tree/master/code/nimweb"
license       = "LGPL-3.0"
srcDir        = "src"
installExt    = @["nim"]
bin           = @["vb_frontend"]


# Dependencies

requires "nim >= 0.20.0", "jester >= 0.5.0", "norm >= 1.0.16", "bcrypt"

