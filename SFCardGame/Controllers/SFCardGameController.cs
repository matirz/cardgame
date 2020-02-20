using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using BusinessLibrary.Model;
using BusinessLibrary.Service;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;

namespace SFCardGame.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class SFCardGameController : ControllerBase
    {
        private readonly ILogger<SFCardGameController> _logger;
        private readonly ISFCardGameService _cardGameService;

        public SFCardGameController(ILogger<SFCardGameController> logger, ISFCardGameService cardGameService)
        {
            _logger = logger;
            _cardGameService = cardGameService;
        }

        [HttpGet]
        [Route("Cards")]
        public async Task<List<CardModel>> Cards()
        {
            return await _cardGameService.GetCards();
        }

        [HttpGet]
        [Route("RandomCard/{type}")]
        public async Task<CardModel> RandomCard(string type)
        {
            return await _cardGameService.GetRandomCard(type);
        }        
    }
}
