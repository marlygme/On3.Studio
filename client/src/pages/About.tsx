export default function About() {
  return (
    <div className="py-20 px-6">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-6xl font-bold mb-8" data-testid="text-about-title">
            <span className="text-primary">ABOUT</span> ON3 STUDIO
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            A creative community built with integrity, passion, and real culture
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-16 items-center mb-20">
          <div>
            <img 
              src="https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=600"
              alt="Community gathering in creative space with warm ambient lighting"
              className="w-full h-96 object-cover rounded-xl" 
              data-testid="img-community"
            />
          </div>
          <div>
            <h2 className="text-4xl md:text-5xl font-bold mb-8" data-testid="text-why-exist-title">
              <span className="text-primary">WHY</span> WE EXIST
            </h2>
            <p className="text-lg text-muted-foreground leading-relaxed mb-6" data-testid="text-why-exist-description">
              We saw a gap and wanted to give back. ON3 is built with integrity, a safe, 
              inspiring space where artists can land in Melbourne, feel at home, tap-in and 
              create without the noise.
            </p>
            <p className="text-lg text-accent font-semibold mb-8">
              Our focus is community, passion, and real culture.
            </p>
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div className="order-2 lg:order-1">
            <h2 className="text-4xl md:text-5xl font-bold mb-8" data-testid="text-community-title">
              <span className="text-primary">COMMUNITY</span>
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
          <div className="order-1 lg:order-2">
            <img 
              src="https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=600"
              alt="Artists collaborating in creative studio space"
              className="w-full h-96 object-cover rounded-xl" 
              data-testid="img-artists-collaboration"
            />
          </div>
        </div>

        {/* How It Works */}
        <div className="mt-20 text-center bg-card/30 rounded-xl p-12">
          <h2 className="text-3xl font-bold mb-8 text-accent" data-testid="text-how-it-works-title">HOW IT WORKS</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="space-y-4">
              <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center mx-auto">
                <span className="text-2xl font-bold text-primary">1</span>
              </div>
              <h3 className="text-xl font-semibold">Plug-and-play</h3>
              <p className="text-muted-foreground">Book, land in Melbourne and get straight into it.</p>
            </div>
            <div className="space-y-4">
              <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center mx-auto">
                <span className="text-2xl font-bold text-primary">2</span>
              </div>
              <h3 className="text-xl font-semibold">Create</h3>
              <p className="text-muted-foreground">Record, rehearse, shoot, create, podcast, or connect.</p>
            </div>
            <div className="space-y-4">
              <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center mx-auto">
                <span className="text-2xl font-bold text-primary">3</span>
              </div>
              <h3 className="text-xl font-semibold">Connect</h3>
              <p className="text-muted-foreground">Tap into our community of creatives & artists.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
