import os
import subprocess
import docker
from colorama import Fore, Style, init

init(autoreset=True)

def run_app(apply_migrations):
    env = os.environ.copy()
    env['APPLY_MIGRATIONS'] = 'true' if apply_migrations else 'false'
    command = ['docker-compose', 'up', '-d', '--build']
    try:
        subprocess.run(command, check=True, env=env)
        print(Fore.GREEN + f"App is running with APPLY_MIGRATIONS={env['APPLY_MIGRATIONS']}. Access it via {Fore.CYAN}http://localhost:4200.")
    except subprocess.CalledProcessError as e:
        print(Fore.RED + f"An error occurred while starting the app: {e}")

def shut_down_app():
    command = ['docker-compose', 'down']
    try:
        subprocess.run(command, check=True)
        print(Fore.YELLOW + "App has been shut down successfully.")
    except subprocess.CalledProcessError as e:
        print(Fore.RED + f"An error occurred while shutting down the app: {e}")

def print_menu():
    print("\n" + Fore.CYAN + "Select an option:")
    print(Fore.GREEN + "1) Run app with migrations")
    print(Fore.GREEN + "2) Run app without migrations")
    print(Fore.YELLOW + "4) Shut down your app")
    print(Fore.RED + "5) Exit")

def main():
    while True:
        print_menu()
        choice = input(Fore.CYAN + "Enter your choice: ")

        if choice == '1':
            run_app(apply_migrations=True)
        elif choice == '2':
            run_app(apply_migrations=False)
        elif choice == '4':
            shut_down_app()
        elif choice == '5':
            print(Fore.GREEN + "Exiting...")
            break
        else:
            print(Fore.RED + "Invalid choice. Please try again.")

if __name__ == "__main__":
    main()
