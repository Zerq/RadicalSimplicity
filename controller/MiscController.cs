using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.SignalR;

namespace RadicalSimplicity.controller;

public class MiscController: Controller
{
    [HttpGet("/")]
    public FileResult index(){

        return File("index.html", "text/html");
    }
}
