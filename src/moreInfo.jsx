import './moreInfo.css'

function MoreInfo() {
    return (
        <div>
            <section id="lorem-ipsum">
                <h1>What is lorem ipsum?</h1>

                <div className="lorem-ipsum-paras">
                    <p>
                        Lorem Ipsum is placeholder text commonly used in design,
                        publishing, and web development to preview how written 
                        content will appear in a layout before the final copy is available.
                    </p>

                    <p>
                        Its origins trace back to a Latin text written by Cicero around 45 BC.
                        The text was later adapted into the scrambled form we use today 
                        and became widely popular in the 1960s with the rise of desktop 
                        publishing.
                    </p>

                    <p>
                        Lorem Ipsum helps designers focus on structure, typography, and 
                        spacing without being distracted by meaningful content. Today, it 
                        exists in many variations, including classic Latin, simplified 
                        versions, and themed or randomized formats for different use cases. 
                        <a href="https://www.typingpal.com/en/blog/lorem-ipsum-the-ultimate-placeholder-text" target='_blank'> Learn more</a>
                    </p>
                </div>
            </section>

            <section id="about">
                <h1>About</h1>

                <div className="about-paras">
                    <p>
                        Hi there! &#128075; I'm David, an aspiring solo app developer.
                        I've always loved coding and enjoy building apps that solve real problems
                        in people's lives. This is actually my first website ever! I hope you enjoy it,
                        and if you really enjoy it, consider buying me a coffee - No pressure!
                    </p>

                    <p>You can check out my <a href="https://www.youtube.com/@DevWithDavidJSX" target='_blank'>youtube channel</a> all about building apps (including this one) by clicking this link</p>
                </div>
            </section>

            <section id="report-a-bug">
                <h1>Report a bug</h1>

                <p>
                    If you spot a bug or have a suggestion,
                    feel free to reach out. I value direct feedback to keep 
                    this tool fast, clean, and reliable for everyone. You can email me at <a href="https://mail.google.com/mail/u/0/#inbox?compose=GTvVlcRzDsTBWcnBHrGrcFgbcMcwQhQNnWkSQhjqKrhBthmblbwFWZZfDtZWXHvwLxsRbPHnFQPsr" target='_blank'>dmacaskill19@gmail.com</a>
                </p>

            </section>

        </div>
    )
}

export default MoreInfo