# DEEPSEEK VISUAL STUDIO CODE EXTENSION: README

This is the README for your extension "deepseek-r1". 

## Features

Use Deepseek on your VS Code Editor. Use on a terminal or in a VS Code window.

## Requirements

* A pc with at least 32 gbs of RAM
* A decent cpu (a modern six-core processor or better)
* Enough storage for your packages. I recommend allocating at least 10 gb of free storage for your Deepseek extension so you take advantage of better packages. Bigger packages deliver a much better quality but do not require that much more power from your cpu compared to smaller packages. Personally I use package 14b, which works well with Ryzen 5 3600 and 32 gigabytes of RAM. Larger packages than 14b run a lot slower in comparison and would require better hardware to keep token generation at an acceptable level.
* Official Deepseek-r1 packages from Ollama website. You also need to install Ollama software that runs on the background and handles the packages.
* VS Code installed, Node.js installed and a terminal.

# Instructions


* Paste the files in your working directory. Or you can first run the VS Code Extension Generator with command "npx --package yo --package generator-code -- yo code" (use the default settings) and then paste the files.
* Download Ollama and Deepseek-r1 packages. Install both. Run the deepseek package with git bash command line using command "ollama run deepseek-r1:14b". The part after colon is the package you want to use, change it if you want to use another package.
* Run "npm i" to install dependencies in VS Code, then "npm i ollama" to install Ollama package. Make sure you have Typescript installed. Run compile and use a watcher to watch for changes. All the commands you need are in the package.json file.
* Start the debugger in a new window with (Ctrl + Shift + P) and select "Debug: start debugging", or you can click "Run Extension (deepseek)" to start the debugger. Then in a new window, type (Ctrl + Shift + P) again and type "Deep Seek" in the command line, after which Deep Seek chat will appear in a new window with a user interface.

# How to get the best user experience

* I recommend using a fullscreen window. Don't change the size of a window at any time, because you might lose the output text when the window size changes.
* Copy the output and paste it in another file so you can save all the answers you want to keep.
* Check the Ollama website for the new packages every now and then and keep your files updated. You can try different packages and use only those that your pc can run without issues.
* You need a good cpu, seriously! A Ryzen 5 3600 has over 70% core utilization with package 14b. Even the smallest package currently available, 1.5b, pushes to over 60% utilization.
* Remember that Deepseek is only a tool. It's awesome but it's not perfect; it makes lots of mistakes. I think it's still a good option compared to other LLM tools that cost a lot of money.

# Why use this extension?

* The main benefit of using an extension is that you can be sure that nobody is harvesting your data. The same is not true when you're using a browser or a mobile phone app. This extension uses VS Code to run it, but you don't have to use use VS Code if you don't want to. Another good option to run Deepseek privately would be AnythingLLM, which allows the private use of LLMs.
  
# Enjoy!

Screenshot of the user interface:

![VS Code extension - deepseek](https://github.com/user-attachments/assets/733fb973-d300-4229-af54-bceee8269d1d)

