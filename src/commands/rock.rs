use rand :: Rng;
use serenity::builder::{CreateCommand, CreateCommandOption};
use serenity::model::application::{CommandOptionType, ResolvedOption, ResolvedValue};

// now before you look, i think i fucked some things up

// gimme a break rust hates me and its scary

pub fn run(options: &[ResolvedOption]) -> String {
    if let Some(ResolvedOption {
        value: ResolvedValue::String(choice), ..
    }) = options.first() {
        let mut rng = rand::thread_rng();
        let computer_choice = match rng.gen_range(0..3) {
            0 => "rock",
            1 => "paper",
            2 => "scissors",
            _ => "error",
        };
        match choice {
            &"rock" => match computer_choice {
                "rock" => "It's a tie! [rock]",
                "paper" => "You lose! [paper]",
                "scissors" => "You win! [scissors!]",
                _ => "error",
            },
            &"paper" => match computer_choice {
                "rock" => "You win! [rock!]",
                "paper" => "It's a tie! [paper!]",
                "scissors" => "You lose! [scissors]",
                _ => "error",
            },
            &"scissors" => match computer_choice {
                "rock" => "You lose! [rock]",
                "paper" => "You win! [paper]",
                "scissors" => "It's a tie! [scissors]",
                _ => "error",
            },
            _ => "Please provide a valid choice",
        }
        .to_string()
    } else {
        "Please provide a valid choice".to_string()
    }
}

pub fn register() -> CreateCommand {
    CreateCommand::new("rock-hard")
        .description("stupid school game")
        .add_option(
            CreateCommandOption::new(
                CommandOptionType::String,
                "choice",
                "choices [rock, paper, scissors]",
            )
            .required(true),
        )
        
}