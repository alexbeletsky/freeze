#Freeze

Easy way of making a snapshot of dynamic web site.

##Description

Say you have some dynamic web site (ASP.NET MVC, RubyOnRails, DJango, whatever) and you decieded to host on some static content hoster (like gh-pages on Github). You can simpy take a snapshot of the current state of the site and `freeze` will produce the bunch of HTML/CSS/JS files ready to be put on static content server.

##Installation

`npm install -g freeze`

##Usage

`freeze http://kyivbeerncode.org`

After application finishes up, you will have folder `freeze` near same structure.

    /--- freeze
            |
            + --- index.html
                        |
                        + --- static
                                |
                                + --- js
                                + --- css
                        + --- blog
                                |
                                + --- 20121010.html
                                + --- 20121012.html
                                + --- 20121016.html
                        + --- about
                                |
                                + --- about.html

##How it works?

It will crawle the target website and collect all `internal` links. After it will get the content of all collected links and put it corresposding physical folder. As soon as it's ready all references of scripts and styles will be corrected according to new folder structure.

#Licence

Copyright (c) 2012 <alexander.beletsky@gmail.com>

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.