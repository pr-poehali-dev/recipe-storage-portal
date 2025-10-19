import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import Icon from '@/components/ui/icon';
import { Calendar } from '@/components/ui/calendar';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface Recipe {
  id: number;
  title: string;
  description: string;
  image: string;
  cookTime: string;
  difficulty: 'Легко' | 'Средне' | 'Сложно';
  category: string;
  isFavorite?: boolean;
}

const mockRecipes: Recipe[] = [
  {
    id: 1,
    title: 'Паста Карбонара',
    description: 'Классическая итальянская паста с беконом, яйцом и сыром пармезан',
    image: 'https://cdn.poehali.dev/projects/023cfefc-78c5-4b49-9855-dcd28536b428/files/3692cad9-0de0-4718-943a-284f327d7ecf.jpg',
    cookTime: '25 мин',
    difficulty: 'Средне',
    category: 'Основные блюда'
  },
  {
    id: 2,
    title: 'Салат Цезарь',
    description: 'Свежий салат с курицей, хрустящими сухариками и соусом Цезарь',
    image: 'https://cdn.poehali.dev/projects/023cfefc-78c5-4b49-9855-dcd28536b428/files/b485718c-60a8-45d8-8a3b-06981406c14a.jpg',
    cookTime: '15 мин',
    difficulty: 'Легко',
    category: 'Салаты'
  },
  {
    id: 3,
    title: 'Шоколадный торт',
    description: 'Нежный шоколадный бисквит с кремом и свежими ягодами',
    image: 'https://cdn.poehali.dev/projects/023cfefc-78c5-4b49-9855-dcd28536b428/files/96457618-6e78-46aa-a3b3-d1de998a45ec.jpg',
    cookTime: '90 мин',
    difficulty: 'Сложно',
    category: 'Десерты'
  },
];

const Index = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [activeTab, setActiveTab] = useState('home');
  const [recipes] = useState<Recipe[]>(mockRecipes);
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  const [mealPlan] = useState<{ [key: string]: Recipe[] }>({});

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Легко': return 'bg-secondary text-white';
      case 'Средне': return 'bg-accent text-white';
      case 'Сложно': return 'bg-primary text-white';
      default: return 'bg-muted';
    }
  };

  const RecipeCard = ({ recipe }: { recipe: Recipe }) => (
    <Card className="overflow-hidden hover:shadow-xl transition-all duration-300 hover:scale-105 animate-fade-in group">
      <div className="relative overflow-hidden h-48">
        <img
          src={recipe.image}
          alt={recipe.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute top-3 right-3">
          <Button size="icon" variant="secondary" className="rounded-full bg-white/90 hover:bg-white">
            <Icon name="Heart" size={18} />
          </Button>
        </div>
      </div>
      <CardHeader>
        <div className="flex justify-between items-start mb-2">
          <CardTitle className="text-xl">{recipe.title}</CardTitle>
          <Badge className={getDifficultyColor(recipe.difficulty)}>{recipe.difficulty}</Badge>
        </div>
        <CardDescription>{recipe.description}</CardDescription>
      </CardHeader>
      <CardFooter className="flex justify-between">
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Icon name="Clock" size={16} />
          <span>{recipe.cookTime}</span>
        </div>
        <Button size="sm" className="bg-primary hover:bg-primary/90">
          <Icon name="Eye" size={16} className="mr-2" />
          Подробнее
        </Button>
      </CardFooter>
    </Card>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/20 to-background">
      <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-lg border-b border-border shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 bg-gradient-to-br from-primary to-secondary rounded-xl flex items-center justify-center">
                <Icon name="ChefHat" size={24} className="text-white" />
              </div>
              <span className="text-2xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                Вкусные Рецепты
              </span>
            </div>
            
            <div className="hidden md:flex gap-6">
              <Button variant="ghost" onClick={() => setActiveTab('home')}>
                <Icon name="Home" size={18} className="mr-2" />
                Главная
              </Button>
              <Button variant="ghost" onClick={() => setActiveTab('recipes')}>
                <Icon name="BookOpen" size={18} className="mr-2" />
                Рецепты
              </Button>
              <Button variant="ghost" onClick={() => setActiveTab('planner')}>
                <Icon name="Calendar" size={18} className="mr-2" />
                Планировщик
              </Button>
              {isLoggedIn && (
                <Button variant="ghost" onClick={() => setActiveTab('favorites')}>
                  <Icon name="Heart" size={18} className="mr-2" />
                  Избранное
                </Button>
              )}
            </div>

            <div className="flex gap-2">
              {!isLoggedIn ? (
                <Dialog>
                  <DialogTrigger asChild>
                    <Button className="bg-primary hover:bg-primary/90">
                      <Icon name="LogIn" size={18} className="mr-2" />
                      Войти
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-md">
                    <DialogHeader>
                      <DialogTitle>Вход в аккаунт</DialogTitle>
                      <DialogDescription>
                        Войдите, чтобы создавать и сохранять рецепты
                      </DialogDescription>
                    </DialogHeader>
                    <Tabs defaultValue="login" className="w-full">
                      <TabsList className="grid w-full grid-cols-2">
                        <TabsTrigger value="login">Вход</TabsTrigger>
                        <TabsTrigger value="register">Регистрация</TabsTrigger>
                      </TabsList>
                      <TabsContent value="login" className="space-y-4">
                        <div className="space-y-2">
                          <Label htmlFor="email">Email</Label>
                          <Input id="email" type="email" placeholder="your@email.com" />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="password">Пароль</Label>
                          <Input id="password" type="password" />
                        </div>
                        <Button className="w-full bg-primary" onClick={() => setIsLoggedIn(true)}>
                          Войти
                        </Button>
                      </TabsContent>
                      <TabsContent value="register" className="space-y-4">
                        <div className="space-y-2">
                          <Label htmlFor="reg-name">Имя</Label>
                          <Input id="reg-name" placeholder="Ваше имя" />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="reg-email">Email</Label>
                          <Input id="reg-email" type="email" placeholder="your@email.com" />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="reg-password">Пароль</Label>
                          <Input id="reg-password" type="password" />
                        </div>
                        <Button className="w-full bg-secondary" onClick={() => setIsLoggedIn(true)}>
                          Зарегистрироваться
                        </Button>
                      </TabsContent>
                    </Tabs>
                  </DialogContent>
                </Dialog>
              ) : (
                <Button variant="outline" onClick={() => setIsLoggedIn(false)}>
                  <Icon name="User" size={18} className="mr-2" />
                  Профиль
                </Button>
              )}
            </div>
          </div>
        </div>
      </nav>

      {activeTab === 'home' && (
        <div className="animate-fade-in">
          <section className="relative py-20 overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-primary/10 via-secondary/10 to-accent/10" />
            <div className="container mx-auto px-4 relative z-10">
              <div className="max-w-3xl mx-auto text-center animate-slide-up">
                <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
                  Ваша кулинарная книга
                </h1>
                <p className="text-xl text-muted-foreground mb-8">
                  Создавайте, сохраняйте и планируйте вкусные рецепты на каждый день
                </p>
                <div className="flex gap-4 justify-center flex-wrap">
                  <Button size="lg" className="bg-primary hover:bg-primary/90 text-lg px-8">
                    <Icon name="Plus" size={20} className="mr-2" />
                    Создать рецепт
                  </Button>
                  <Button size="lg" variant="outline" className="text-lg px-8">
                    <Icon name="BookOpen" size={20} className="mr-2" />
                    Посмотреть все
                  </Button>
                </div>
              </div>
            </div>
          </section>

          <section className="container mx-auto px-4 py-16">
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-3xl font-bold">Популярные рецепты</h2>
              <Button variant="ghost" onClick={() => setActiveTab('recipes')}>
                Смотреть все
                <Icon name="ArrowRight" size={18} className="ml-2" />
              </Button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {recipes.map((recipe) => (
                <RecipeCard key={recipe.id} recipe={recipe} />
              ))}
            </div>
          </section>

          <section className="container mx-auto px-4 py-16">
            <div className="bg-gradient-to-r from-primary to-secondary rounded-3xl p-12 text-white text-center">
              <Icon name="Sparkles" size={48} className="mx-auto mb-4" />
              <h2 className="text-3xl font-bold mb-4">Начните готовить уже сегодня!</h2>
              <p className="text-lg mb-6 opacity-90">
                {isLoggedIn 
                  ? 'Создайте свой первый рецепт и поделитесь им с миром'
                  : 'Зарегистрируйтесь, чтобы создавать и сохранять рецепты'}
              </p>
              {!isLoggedIn && (
                <Dialog>
                  <DialogTrigger asChild>
                    <Button size="lg" variant="secondary" className="bg-white text-primary hover:bg-white/90">
                      Присоединиться
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-md">
                    <DialogHeader>
                      <DialogTitle>Регистрация</DialogTitle>
                      <DialogDescription>Создайте аккаунт за минуту</DialogDescription>
                    </DialogHeader>
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="name">Имя</Label>
                        <Input id="name" placeholder="Ваше имя" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="email">Email</Label>
                        <Input id="email" type="email" placeholder="your@email.com" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="password">Пароль</Label>
                        <Input id="password" type="password" />
                      </div>
                      <Button className="w-full bg-primary" onClick={() => setIsLoggedIn(true)}>
                        Создать аккаунт
                      </Button>
                    </div>
                  </DialogContent>
                </Dialog>
              )}
            </div>
          </section>
        </div>
      )}

      {activeTab === 'recipes' && (
        <div className="container mx-auto px-4 py-8 animate-fade-in">
          <div className="mb-8">
            <h1 className="text-4xl font-bold mb-4">Все рецепты</h1>
            <div className="flex gap-4 flex-wrap">
              <Input placeholder="Поиск рецептов..." className="max-w-sm" />
              <Select>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Категория" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Все категории</SelectItem>
                  <SelectItem value="main">Основные блюда</SelectItem>
                  <SelectItem value="salads">Салаты</SelectItem>
                  <SelectItem value="desserts">Десерты</SelectItem>
                </SelectContent>
              </Select>
              <Select>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Сложность" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Любая</SelectItem>
                  <SelectItem value="easy">Легко</SelectItem>
                  <SelectItem value="medium">Средне</SelectItem>
                  <SelectItem value="hard">Сложно</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {recipes.map((recipe) => (
              <RecipeCard key={recipe.id} recipe={recipe} />
            ))}
          </div>
        </div>
      )}

      {activeTab === 'planner' && (
        <div className="container mx-auto px-4 py-8 animate-fade-in">
          <h1 className="text-4xl font-bold mb-8">Планировщик рациона</h1>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-1">
              <Card>
                <CardHeader>
                  <CardTitle>Выберите дату</CardTitle>
                  <CardDescription>Планируйте питание на неделю вперёд</CardDescription>
                </CardHeader>
                <CardContent>
                  <Calendar
                    mode="single"
                    selected={selectedDate}
                    onSelect={setSelectedDate}
                    className="rounded-md border"
                  />
                </CardContent>
              </Card>
            </div>
            <div className="lg:col-span-2">
              <Card>
                <CardHeader>
                  <CardTitle>Меню на {selectedDate?.toLocaleDateString('ru-RU')}</CardTitle>
                  <CardDescription>Добавьте рецепты на завтрак, обед и ужин</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  {['Завтрак', 'Обед', 'Ужин'].map((mealTime) => (
                    <div key={mealTime} className="border rounded-lg p-4">
                      <h3 className="font-semibold mb-3 flex items-center gap-2">
                        <Icon name="Utensils" size={18} className="text-primary" />
                        {mealTime}
                      </h3>
                      <div className="space-y-2">
                        {mealPlan[mealTime]?.length > 0 ? (
                          mealPlan[mealTime].map((recipe) => (
                            <div key={recipe.id} className="flex items-center gap-3 p-2 bg-muted rounded-lg">
                              <img src={recipe.image} alt={recipe.title} className="w-12 h-12 rounded object-cover" />
                              <span className="flex-1">{recipe.title}</span>
                              <Button size="icon" variant="ghost">
                                <Icon name="X" size={16} />
                              </Button>
                            </div>
                          ))
                        ) : (
                          <Button variant="outline" className="w-full" disabled={!isLoggedIn}>
                            <Icon name="Plus" size={18} className="mr-2" />
                            Добавить рецепт
                          </Button>
                        )}
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'favorites' && isLoggedIn && (
        <div className="container mx-auto px-4 py-8 animate-fade-in">
          <h1 className="text-4xl font-bold mb-8">Избранные рецепты</h1>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {recipes.filter(r => r.isFavorite).length > 0 ? (
              recipes.filter(r => r.isFavorite).map((recipe) => (
                <RecipeCard key={recipe.id} recipe={recipe} />
              ))
            ) : (
              <div className="col-span-full text-center py-16">
                <Icon name="Heart" size={64} className="mx-auto mb-4 text-muted-foreground" />
                <h3 className="text-2xl font-semibold mb-2">Пока нет избранных рецептов</h3>
                <p className="text-muted-foreground mb-6">Добавляйте рецепты в избранное, нажимая на сердечко</p>
                <Button onClick={() => setActiveTab('recipes')}>
                  Посмотреть рецепты
                </Button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Index;
