export default function About() {
  return (
    <div className="overflow-hidden">
      {/* Hero Section - Asymmetric Layout */}
      <div className="relative min-h-screen flex items-center px-6 py-20">
        <div className="container mx-auto max-w-7xl">
          <div className="asymmetric-about-grid">
            {/* Left Column - Narrow */}
            <div className="about-narrow-col">
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 text-vertical-large" data-testid="text-about-title">
                <span className="text-orange-accent">ABOUT</span>
              </h1>
              <div className="hidden lg:block w-2 h-32 bg-orange-accent/30 ml-8"></div>
            </div>

            {/* Right Column - Wide Content */}
            <div className="about-wide-col relative">
              {/* Background Elements */}
              <div className="absolute -top-20 -right-20 w-80 h-80 bg-orange-accent/5 rounded-full blur-3xl"></div>
              <div className="absolute -bottom-10 -left-10 w-60 h-60 bg-primary/5 rounded-full blur-2xl"></div>
              
              <div className="relative z-10">
                <div className="mb-16">
                  <h2 className="text-2xl md:text-3xl font-bold mb-6 text-orange-accent uppercase tracking-wider">
                    ON3 STUDIO
                  </h2>
                  <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl leading-relaxed">
                    A creative community built with integrity, passion, and real culture
                  </p>
                </div>

                {/* Stylized Pull Quote */}
                <div className="pull-quote-container mb-16">
                  <blockquote className="pull-quote">
                    "A home away from home for artists..."
                  </blockquote>
                  <div className="pull-quote-accent"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Why We Exist - Creative Two-Column */}
      <div className="relative py-20 px-6 bg-card/20">
        <div className="container mx-auto max-w-7xl">
          <div className="creative-two-col-layout">
            <div className="creative-col-left relative">
              <div className="absolute -top-10 -left-10 w-40 h-40 bg-orange-accent/10 rounded-full"></div>
              <div className="relative z-10">
                <h2 className="text-5xl md:text-6xl font-bold mb-12 leading-tight" data-testid="text-why-exist-title">
                  <span className="text-primary block">WHY</span>
                  <span className="text-orange-accent block">WE EXIST</span>
                </h2>
              </div>
            </div>
            
            <div className="creative-col-right">
              <div className="space-y-8">
                <p className="text-xl text-muted-foreground leading-relaxed" data-testid="text-why-exist-description">
                  We saw a gap and wanted to give back. ON3 is built with integrity, a safe, 
                  inspiring space where artists can land in Melbourne, feel at home, tap-in and 
                  create without the noise.
                </p>
                <p className="text-xl text-orange-accent font-medium">
                  Our focus is community, passion, and real culture.
                </p>
                <div className="w-20 h-1 bg-orange-accent"></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Community Section - Overlapped Layout */}
      <div className="relative py-20 px-6">
        <div className="container mx-auto max-w-7xl">
          <div className="overlapped-content-layout">
            <div className="overlapped-image-container">
              <div className="w-full h-96 bg-card/30 rounded-xl flex items-center justify-center border border-border transform rotate-1">
                <div className="text-center">
                  <p className="text-2xl font-bold text-primary">IMAGE HERE</p>
                  <p className="text-muted-foreground mt-2">Artists collaboration image placeholder</p>
                </div>
              </div>
              {/* Overlapping accent element */}
              <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-orange-accent/20 rounded-xl -rotate-12"></div>
            </div>
            
            <div className="overlapped-text-container">
              <h2 className="text-4xl md:text-5xl font-bold mb-8 leading-tight" data-testid="text-community-title">
                <span className="text-orange-accent">COMMUNITY</span>
              </h2>
              <p className="text-lg text-muted-foreground leading-relaxed mb-6" data-testid="text-community-description-1">
                ON3 is about its people. The space is centred around growth, we run sessions for 
                creatives to talk about their process and connect through activity, helping each 
                other drop into creative flow.
              </p>
              <p className="text-lg text-muted-foreground leading-relaxed" data-testid="text-community-description-2">
                This is really our home for creativity and a cultural intersection for artists 
                moving in and out of Melbourne.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* How It Works - Creative Asymmetric Grid */}
      <div className="relative py-20 px-6 bg-gradient-to-br from-card/10 to-orange-accent/5">
        <div className="container mx-auto max-w-7xl">
          <div className="creative-steps-layout">
            <div className="steps-header">
              <h2 className="text-4xl md:text-5xl font-bold text-orange-accent mb-12" data-testid="text-how-it-works-title">
                HOW IT WORKS
              </h2>
            </div>
            
            <div className="creative-steps-grid">
              <div className="creative-step-card">
                <div className="step-number-large">01</div>
                <h3 className="text-2xl font-bold mb-4">Plug-and-play</h3>
                <p className="text-muted-foreground descriptive-text">Book, land in Melbourne and get straight into it.</p>
              </div>
              <div className="creative-step-card creative-step-offset">
                <div className="step-number-large">02</div>
                <h3 className="text-2xl font-bold mb-4">Create</h3>
                <p className="text-muted-foreground descriptive-text">Record, rehearse, shoot, create, podcast, or connect.</p>
              </div>
              <div className="creative-step-card">
                <div className="step-number-large">03</div>
                <h3 className="text-2xl font-bold mb-4">Connect</h3>
                <p className="text-muted-foreground descriptive-text">Tap into our community of creatives & artists.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
